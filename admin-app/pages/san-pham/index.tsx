import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar,
  Stack,
  Modal,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Image as ImageIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { AdminLayout } from "../../components/AdminLayout";
import { ProductForm } from "../../components/ProductForm";
import api from "../../services/api";
import { useRouter } from "next/router";

export interface Product {
  id: number;
  name: string;
  price: number;
  salePercent: number;
  salePrice: number;
  urlProduct: string;
  favicon?: string;
  topImage?: string;
  formImage?: string;
  topbarColor: string;
  description?: string;
  purchaseOptions: { totalPrice: number; option: string }[];
  details?: string;
  //features CÁC DÒNG CHỮ TRÊN ORDER FORM
  features: { title: string; items: string[]; note?: string }; 
  images?: { id: number; imageUrl: string; position: string }[];
  buyCount?: number;
  seoTitle: string;
  reviewCount?: number;
}
export type ProductFormValues = Omit<Product, "id"> & {
  id?: number;
};
export const defaultFormValues: ProductFormValues = {
  name: "",
  price: 0,
  salePercent: 0,
  salePrice: 0,
  urlProduct: "",
  favicon: "",
  topImage: "",
  formImage: "",
  topbarColor: "",
  description: "",
  purchaseOptions: [],
  details: "",
  features: { title: "", items: [], note: "" },

  buyCount: 0,
  seoTitle: "",
  reviewCount: 0,
};

export default function ProductsPage() {
  const [formInitialValues, setFormInitialValues] =
    useState<ProductFormValues>(defaultFormValues);
  const [isEditMode, setIsEditMode] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  //LƯU DỮ LIỆU CỦA PRODUCT EDIT
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({ open: false, product: null });
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [modalImages, setModalImages] = useState<{
    open: boolean;
    product?: Product;
  }>({ open: false });
  const [modalDetails, setModalDetails] = useState<{
    open: boolean;
    product?: Product;
    type?: "details" | "description" | "features";
  }>({ open: false });
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "success" });
  const [lastFormAction, setLastFormAction] = useState<
    "create" | "update" | null
  >(null);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (err: any) {
      setError("Failed to load products");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setLastFormAction("create");
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setIsEditMode(true);
    setEditingProduct(product);
    setLastFormAction("update");
    setFormInitialValues({
      ...product,
      purchaseOptions: product.purchaseOptions || [],
      details: product.details || "",
      features: product.features || { title: "", items: [], note: "" },
    });
    setFormOpen(true);
  };
  const handleDelete = (product: Product) => {
    setDeleteDialog({ open: true, product });
  };
  const confirmDelete = async () => {
    if (deleteDialog.product) {
      try {
        await api.delete(`/products/${deleteDialog.product.id}`);
        await loadProducts();
        setDeleteDialog({ open: false, product: null });
        setSnackbar({
          open: true,
          message: "Đã xoá sản phẩm",
          severity: "success",
        });
      } catch (err: any) {
        setError("Failed to delete product");
        console.error("Error deleting product:", err);
        setSnackbar({
          open: true,
          message: "Xoá sản phẩm thất bại",
          severity: "error",
        });
      }
    }
  };
  const handleBulkDelete = async () => {
    if (!selectionModel.length) return;
    setBulkDeleteLoading(true);
    try {
      await Promise.all(
        selectionModel.map((id) => api.delete(`/products/${id}`))
      );
      const count = selectionModel.length;
      setSelectionModel([]);
      await loadProducts();
      setSnackbar({
        open: true,
        message: `Đã xoá ${count} sản phẩm`,
        severity: "success",
      });
      setBulkDialogOpen(false);
    } catch (err) {
      setError("Xoá nhiều thất bại");
      setSnackbar({
        open: true,
        message: "Xoá nhiều thất bại",
        severity: "error",
      });
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "stt",
      headerName: "STT",
      flex: 1,
      valueGetter: (params) =>
        products.findIndex((p) => p.id === params.row.id) + 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      minWidth: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textOverflow: "initial",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "seoTitle",
      headerName: "Tiêu đề SEO",
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textOverflow: "initial",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "price",
      headerName: "Giá gốc",
      minWidth: 60,
      renderCell: (params) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(params.value),
    },
    {
      field: "salePrice",
      headerName: "Giá Sale",
      minWidth: 60,
      renderCell: (params) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(params.value),
    },
    {
      field: "salePercent",
      headerName: "Sale %",
      minWidth: 60,
      renderCell: (params) => (
        <Chip
          label={`-${params.value}%`}
          color={params.value > 0 ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "buyCount",
      headerName: "Lượt mua",
      width: 90,
    },
    {
      field: "reviewCount",
      headerName: "Lượt review",
      width: 90,
    },

    {
      field: "urlProduct",
      headerName: "URL",
      width: 120,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textOverflow: "initial",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "topbarColor",
      headerName: "Topbar",
      width: 60,
      renderCell: (params) => (
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: params.value,
            borderRadius: 1,
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    {
      field: "favicon",
      headerName: "Favicon",
      width: 80,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt="favicon"
          sx={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      field: "purchaseOptions",
      headerName: "Tùy chọn mua",
      width: 200,
      renderCell: (params) => (
        <FormControl size="small">
          <Select value="" displayEmpty renderValue={() => "Chọn"}>
            {(params.value as Product["purchaseOptions"]).map((opt, index) => (
              <MenuItem key={index} value={opt.option}>
                {opt.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },

    {
      field: "images",
      headerName: "Ảnh",
      width: 110,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<ImageIcon />}
          onClick={() => setModalImages({ open: true, product: params.row })}
        >
          Xem ảnh
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "details",
      headerName: "Chi tiết",
      width: 130,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<InfoIcon />}
          onClick={() =>
            setModalDetails({
              open: true,
              product: params.row,
              type: "details",
            })
          }
        >
          Xem chi tiết
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 130,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<InfoIcon />}
          onClick={() =>
            setModalDetails({
              open: true,
              product: params.row,
              type: "description",
            })
          }
        >
          Xem chi tiết
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "features",
      headerName: "Order form",
      width: 130,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<InfoIcon />}
          onClick={() =>
            setModalDetails({
              open: true,
              product: params.row,
              type: "features",
            })
          }
        >
          Xem chi tiết
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.row)}
        />,
      ],
    },
  ];

  // Modal hiển thị ảnh
  const renderImagesModal = () => {
    if (!modalImages.product) return null;
    const product = modalImages.product;

    // Lấy images gốc
    let images = product.images ? [...product.images] : [];

    // Bổ sung topImage và formImage nếu có
    if (product.topImage) {
      images.push({
        id: -1, // id ảo
        imageUrl: product.topImage,
        position: "top",
      });
    }
    if (product.formImage) {
      images.push({
        id: -2, // id ảo
        imageUrl: product.formImage,
        position: "form",
      });
    }

    const top = images.find((img) => img.position === "top");
    const orderForm = images.find((img) => img.position === "form");
    const slides = images.filter((img) => img.position === "slide");
    const details = images.filter((img) => img.position === "detail");

    const handleDeleteImage = async (imageId: number) => {
      if (!confirm("Bạn có chắc muốn xoá ảnh này?")) return;
      try {
        await api.delete(`/products/${product.id}/images/${imageId}`);
        setModalImages({
          open: true,
          product: {
            ...product,
            images: product.images?.filter((img) => img.id !== imageId),
          },
        });
        alert("Xoá ảnh thành công");
      } catch (err) {
        console.error(err);
        alert("Xoá ảnh thất bại");
      }
    };

    return (
      <Modal
        open={modalImages.open}
        onClose={() => setModalImages({ open: false })}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 3,
            maxWidth: 800,
            maxHeight: "100vh",
            overflowY: "auto",
            mx: "auto",
            borderRadius: 2,
            outline: "none",
          }}
        >
          {/* topImage + formImage trên 1 hàng */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 3, justifyContent: "center" }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ảnh sản phẩm
            </Typography>
            {top && (
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={top.imageUrl}
                  alt="top"
                  style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8 }}
                />
                {top.id > 0 && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteImage(top.id)}
                  >
                    Xoá
                  </Button>
                )}
              </Box>
            )}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ảnh nền form đơn hàng
            </Typography>

            {orderForm && (
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={orderForm.imageUrl}
                  alt="form"
                  style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8 }}
                />
                {orderForm.id > 0 && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteImage(orderForm.id)}
                  >
                    Xoá
                  </Button>
                )}
              </Box>
            )}
          </Stack>

          {/* slide */}
          {slides.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Ảnh slide:</Typography>
              <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
                {slides.map((img) => (
                  <Box key={img.id} sx={{ textAlign: "center" }}>
                    <img
                      src={img.imageUrl}
                      alt="slide"
                      style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8 }}
                    />
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      Xoá
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* detail */}
          {details.length > 0 && (
            <Box>
              <Typography variant="subtitle1">Ảnh chi tiết:</Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                {details.map((img) => (
                  <Box key={img.id} sx={{ textAlign: "center" }}>
                    <img
                      src={img.imageUrl}
                      alt="detail"
                      style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8 }}
                    />
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteImage(img.id)}
                    >
                      Xoá
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button onClick={() => setModalImages({ open: false })}>
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  // Modal hiển thị details/description/features
  const renderDetailsModal = () => {
    if (!modalDetails.product) return null;
    const { product, type } = modalDetails;
    let content = null;
    if (type === "details") {
      content = (
        <div dangerouslySetInnerHTML={{ __html: product.details || "" }} />
      );
    } else if (type === "description") {
      content = (
        <div dangerouslySetInnerHTML={{ __html: product.description || "" }} />
      );
    } else if (type === "features") {
      const f = product.features || { title: "", items: [], note: "" };
      content = (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {f.title}
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {f.items && f.items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
          {f.note && (
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "red", mt: 1 }}
            >
              {f.note}
            </Typography>
          )}
        </Box>
      );
    }
    return (
      <Modal
        open={modalDetails.open}
        onClose={() => setModalDetails({ open: false })}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 3,
            maxWidth: 600,
            maxHeight: "100vh",
            overflowY: "auto",
            mx: "auto",
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chi tiết
          </Typography>
          {content}
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button onClick={() => setModalDetails({ open: false })}>
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <AdminLayout>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Danh sách sản phẩm</Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
              sx={{ mr: 2 }}
            >
              Thêm
            </Button>
            <Button
              variant="outlined"
              color="error"
              disabled={!selectionModel.length || bulkDeleteLoading}
              onClick={() => setBulkDialogOpen(true)}
            >
              {bulkDeleteLoading
                ? "Đang xoá..."
                : `Xoá nhiều (${selectionModel.length})`}
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert
            variant="filled"
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={setSelectionModel}
            rowSelectionModel={selectionModel}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            rowHeight={80}
            sx={{ border: 1, borderColor: "divider" }}
            getRowId={(row) => row.id}
          />
        </Box>

        <ProductForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);

            if (isEditMode) {
              // Nếu đang EDIT thì reset về default
              setFormInitialValues(defaultFormValues);
              setEditingProduct(null);
              setIsEditMode(false);
            }
          }}
          initial={{ ...defaultFormValues, ...formInitialValues }}
          onSaved={async () => {
            await loadProducts();
            setFormOpen(false);
            if (lastFormAction === "create")
              setSnackbar({
                open: true,
                message: "Tạo sản phẩm thành công",
                severity: "success",
              });
            else if (lastFormAction === "update")
              setSnackbar({
                open: true,
                message: "Cập nhật sản phẩm thành công",
                severity: "success",
              });
            setLastFormAction(null);
          }}
          title={editingProduct ? "Sửa" : "Thêm"}
          setFormInitialValues={setFormInitialValues}
        />

        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, product: null })}
        >
          <DialogTitle>Xoá</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc muốn xoá "{deleteDialog.product?.name}"?.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialog({ open: false, product: null })}
            >
              Huỷ
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Xoá
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)}>
          <DialogTitle>Xoá nhiều</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc muốn xoá {selectionModel.length} sản phẩm đã chọn?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBulkDialogOpen(false)}>Huỷ</Button>
            <Button
              onClick={handleBulkDelete}
              color="error"
              variant="contained"
              disabled={bulkDeleteLoading}
            >
              {bulkDeleteLoading ? "Đang xoá..." : "Xoá"}
            </Button>
          </DialogActions>
        </Dialog>

        {renderImagesModal()}
        {renderDetailsModal()}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
}
