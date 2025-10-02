import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { CheckCircle, LocalShipping, Edit } from "@mui/icons-material";
import { AdminLayout } from "../components/AdminLayout";
import api from "../services/api";

interface Order {
  id: number;
  receiveStatus: string;
  transferStatus: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  product: {
    name: string;
  };
  purchaseOption: string;
  totalPrice: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateDialog, setUpdateDialog] = useState<{
    open: boolean;
    order: Order | null;
    field: "receiveStatus" | "transferStatus" | null;
  }>({
    open: false,
    order: null,
    field: null,
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err: any) {
      setError("Failed to load orders");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (
    order: Order,
    field: "receiveStatus" | "transferStatus"
  ) => {
    setUpdateDialog({ open: true, order, field });
  };

  const confirmStatusUpdate = async () => {
    if (updateDialog.order && updateDialog.field) {
      try {
        const newStatus =
          updateDialog.field === "receiveStatus" ? "received" : "transferred";
        await api.patch(`/orders/${updateDialog.order.id}`, {
          [updateDialog.field]: newStatus,
        });
        await loadOrders();
        setUpdateDialog({ open: false, order: null, field: null });
      } catch (err: any) {
        setError("Failed to update order status");
        console.error("Error updating order:", err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
      case "transferred":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "stt",
      headerName: "STT",
      width: 80,
      valueGetter: (params) => params.api.getAllRowIds().indexOf(params.id) + 1, 
      sortable: false,
      filterable: false,
    },
    {
      field: "customer",
      headerName: "Khách hàng",
      width: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.value.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.value.phone}
          </Typography>
        </Box>
      ),
    },
    {
      field: "product",
      headerName: "Sản phẩm",
      width: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            textOverflow: "initial",
          }}
        >
          {params.value.name}
        </Typography>
      ),
    },
    {
      field: "purchaseOption",
      headerName: "Loại",
      width: 300,
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
      field: "totalPrice",
      headerName: "Tiền",
      width: 100,
      renderCell: (params) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(params.value),
    },
    {
      field: "transferStatus",
      headerName: "Trạng thái chuyển khoản",
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value === "transferred" ? "Lên đơn" : ""}
        </Typography>
      ),
    },
    {
      field: "receiveStatus",
      headerName: "Trạng thái nhận hàng",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={
            params.value === "received"
              ? "Đã nhận"
              : params.value === "pending"
              ? "Chờ nhận"
              : params.value
          }
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },

    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("vi-VN"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CheckCircle />}
          label="Đánh dấu đã nhận"
          onClick={() => handleStatusUpdate(params.row, "receiveStatus")}
          disabled={params.row.receiveStatus === "received"}
        />,
        <GridActionsCellItem
          icon={<LocalShipping />}
          label="Đánh dấu đã chuyển khoản"
          onClick={() => handleStatusUpdate(params.row, "transferStatus")}
          disabled={params.row.transferStatus === "transferred"}
        />,
      ],
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        {/* <Typography variant="h4" gutterBottom>
          Đơn hàng
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Quản lý đơn hàng và theo dõi trạng thái
        </Typography> */}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error === "Failed to load orders"
              ? "Không thể tải đơn hàng"
              : error === "Failed to update order status"
              ? "Không thể cập nhật trạng thái đơn hàng"
              : error}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "flex-end",
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              Đơn hàng
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Quản lý đơn hàng và theo dõi trạng thái
            </Typography>
          </div>

          <Button
            variant="contained"
            color="success"
            sx={{ fontSize: "0.75rem", minWidth: 100, height: 40 }}
            onClick={async () => {
              try {
                const response = await api.get("/orders/export-pending", {
                  responseType: "blob",
                });

                // Tạo link download từ blob
                const url = window.URL.createObjectURL(
                  new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Đơn vận chuyển.xlsx");
                document.body.appendChild(link);
                link.click();
                link.remove();
              } catch (err) {
                console.error("Export error:", err);
                alert("Xuất Excel thất bại");
              }
            }}
          >
            Xuất Excel
          </Button>
        </Box>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            paginationModel={{ pageSize: 10, page: 0 }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{ border: 1, borderColor: "divider" }}
          />
        </Box>

        <Dialog
          open={updateDialog.open}
          onClose={() =>
            setUpdateDialog({ open: false, order: null, field: null })
          }
        >
          <DialogTitle>
            {updateDialog.field === "receiveStatus"
              ? "Cập nhật trạng thái nhận hàng"
              : "Cập nhật trạng thái chuyển khoản"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Đơn hàng #{updateDialog.order?.id} -{" "}
              {updateDialog.order?.customer?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn có chắc chắn muốn đánh dấu đơn hàng này là{" "}
              {updateDialog.field === "receiveStatus"
                ? "đã nhận"
                : "đã chuyển khoản"}
              ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setUpdateDialog({ open: false, order: null, field: null })
              }
            >
              Hủy
            </Button>
            <Button
              onClick={confirmStatusUpdate}
              variant="contained"
              color="primary"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}
