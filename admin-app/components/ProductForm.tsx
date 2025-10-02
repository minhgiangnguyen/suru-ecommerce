import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import api from "../services/api";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useImageUpload } from "../hooks/useImageUpload";
import { defaultFormValues, ProductFormValues } from "../pages/san-pham";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  initial: Partial<ProductFormValues>;
  onSaved: () => void;
  title?: string;
  setFormInitialValues: React.Dispatch<React.SetStateAction<ProductFormValues>>;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block"],
    ["clean"],
  ],
};

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  // category: Yup.string().required("Danh mục là bắt buộc"),
  price: Yup.number().required("Giá là bắt buộc").min(0, "Giá phải >= 0"),
  salePercent: Yup.number().min(0, "Sale % >= 0").max(100, "Sale % <= 100"),
  // salePrice: Yup.number().min(0, "Sale price >= 0"),
  urlProduct: Yup.string().required("URL sản phẩm là bắt buộc"),
});

export const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onClose,
  initial,
  onSaved,
  title = "Thêm/Sửa sản phẩm",
  setFormInitialValues,
}) => {
  // --- ref giữ giá trị form hiện tại ---
  const formValuesRef = useRef<ProductFormValues | null>(null);

  const favicon = useImageUpload(null, false);
  const top = useImageUpload(null, false);
  const orderForm = useImageUpload(null, false);

  const slides = useImageUpload([], true);
  const detailImages = useImageUpload([], true);

  // purchaseOptions temp input
  const [purchaseOption, setPurchaseOption] = useState({
    totalPrice: 0,
    option: "",
  });

  //BIẾN tạm để nhập một item mới ()
  const [featureItem, setFeatureItem] = useState<string>("");


  // Khi dialog đóng (click ngoài hoặc Esc), gọi hàm này:
  const handleDialogClose = () => {
    // Lưu draft về cha (nếu cha truyền hàm)
    if (setFormInitialValues && formValuesRef.current) {
      // lưu nguyên values hiện tại (bạn có thể merge default nếu muốn)
      setFormInitialValues(formValuesRef.current);
    }
    // gọi onClose gốc (cha sẽ set formOpen=false)
    onClose();
  };
  const handleAddOption = (
    values: ProductFormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const updated = [...values.purchaseOptions, purchaseOption];
    setFieldValue("purchaseOptions", updated);

    // reset input
    setPurchaseOption({ totalPrice: 0, option: "" });
  };

  const handleRemoveOption = (
    opt: { totalPrice: number; option: string },
    values: ProductFormValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const updated = values.purchaseOptions.filter((o) => o !== opt);
    setFieldValue("purchaseOptions", updated);
  };

  // const handleAddFeatureItem = () => {
  //   if (featureItem.trim() && !featureItems.includes(featureItem.trim())) {
  //     setFeatureItems([...featureItems, featureItem.trim()]);
  //     setFeatureItem("");
  //   }
  // };
  // const handleRemoveFeatureItem = (item: string) => {
  //   setFeatureItems(featureItems.filter((i) => i !== item));
  // };
  const handleSubmit = async (
    values: ProductFormValues,
    { setSubmitting }: FormikHelpers<ProductFormValues>
  ) => {
    try {
      let productId = initial?.id;
      // const submitData = {
      //   ...values,
      //   details,
      //   features: {
      //     title: featureTitle,
      //     items: featureItems,
      //     note: featureNote,
      //   },
      // };
      const submitData = values;

      if (!productId) {
        const res = await api.post("/products", submitData);
        productId = res.data.id;
      } else {
        await api.patch(`/products/${productId}`, submitData);
      }

      const uploadFile = async (
        file: File,
        endpoint: string,
        positions?: string[]
      ) => {
        const fd = new FormData();
        if (positions) {
          fd.append("files", file);
          fd.append("positions", JSON.stringify(positions));
        } else {
          fd.append("file", file);
        }
        return api.post(endpoint, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      };

      if (productId) {
        const uploadSpecial = async (
          file: File,
          type: "favicon" | "topImage" | "formImage"
        ) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("type", type);
          return api.post(`/products/${productId}/special-image`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        };

        // upload favicon
        if (favicon.files.length) {
          await uploadSpecial(favicon.files[0], "favicon");
        }

        // upload topImage
        if (top.files.length) {
          await uploadSpecial(top.files[0], "topImage");
        }

        // upload formImage
        if (orderForm.files.length) {
          await uploadSpecial(orderForm.files[0], "formImage");
        }

        // slides (nhiều file)
        if (slides.files.length) {
          await Promise.all(
            slides.files.map((f) =>
              uploadFile(f, `/products/${productId}/images`, ["slide"])
            )
          );
        }

        // details (nhiều file)
        if (detailImages.files.length) {
          await Promise.all(
            detailImages.files.map((f) =>
              uploadFile(f, `/products/${productId}/images`, ["detail"])
            )
          );
        }
      }
      // RESET TẤT CẢ ẢNH PREVIEW
      favicon.reset();
      top.reset();
      orderForm.reset();
      slides.reset();
      detailImages.reset();

      setFeatureItem(""); // reset ITEM FEATURE
      //RESET TOÀN BỘ INPUT
      setFormInitialValues(defaultFormValues);
      onSaved();
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setSubmitting(false);
    }
  };
  const safeInitial: ProductFormValues = {
    name: initial?.name ?? "",
    seoTitle: initial?.seoTitle ?? "",
    price: initial?.price ?? 0,
    salePercent: initial?.salePercent ?? 0,
    salePrice: initial?.salePrice ?? 0,
    urlProduct: initial?.urlProduct ?? "",
    favicon: initial?.favicon ?? "",
    topImage: initial?.topImage ?? "",
    formImage: initial?.formImage ?? "",
    topbarColor: initial?.topbarColor ?? "#ffffff",
    description: initial?.description ?? "",
    purchaseOptions: initial?.purchaseOptions ?? [],
    details: initial?.details ?? "",
    features: initial?.features ?? { title: "", items: [], note: "" },
    buyCount: initial?.buyCount ?? 0,
    reviewCount: initial?.reviewCount ?? 0,
    id: initial?.id,
  };
  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <Formik<ProductFormValues>
        initialValues={safeInitial}
        enableReinitialize={true} // quan trọng để Formik cập nhật khi initial thay đổi
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          isSubmitting,
          touched,
          errors,
        }) => {
          // --- cập nhật ref mỗi lần render để lưu giá trị mới nhất ---
          formValuesRef.current = values;

          return (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  {/* Name, Category, Price, Sale %, Sale Price */}
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label="Tên sản phẩm"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Tiêu đề SEO"
                      name="seoTitle"
                      value={values.seoTitle}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Topbar Color */}
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 120 }}>
                        Màu sắc Top bar:
                      </Typography>

                      {/* Color picker + input nằm chung */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* Ô chọn màu */}
                        <input
                          type="color"
                          name="topbarColor"
                          value={values.topbarColor}
                          onChange={handleChange}
                          style={{
                            width: 40,
                            height: 40,
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            padding: 0,
                          }}
                        />

                        {/* TextField nhập mã màu */}
                        <TextField
                          name="topbarColor"
                          value={values.topbarColor}
                          onChange={handleChange}
                          size="small"
                          sx={{ width: 100 }}
                          placeholder="#RRGGBB"
                          inputProps={{ maxLength: 7 }} // Giới hạn dạng #RRGGBB
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Giá gốc"
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      error={touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Phần trăm giảm giá"
                      type="number"
                      name="salePercent"
                      value={values.salePercent}
                      onChange={handleChange}
                      error={touched.salePercent && !!errors.salePercent}
                      helperText={touched.salePercent && errors.salePercent}
                    />
                    <TextField
                      fullWidth
                      label="Giá Sale"
                      type="number"
                      name="salePrice"
                      value={values.salePrice}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Lượt mua"
                      type="number"
                      name="buyCount"
                      value={values.buyCount}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Số lượng review"
                      type="number"
                      name="reviewCount"
                      value={values.reviewCount}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Favicon */}
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <Typography variant="body2">Favicon:</Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        disabled={isSubmitting}
                      >
                        Upload Favicon
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => favicon.onChange(e.target.files)}
                        />
                      </Button>
                      {favicon.previews.map((url, idx) => (
                        <Card
                          key={idx}
                          sx={{ width: 200, mt: 1, position: "relative" }}
                        >
                          <CardMedia
                            component="img"
                            image={url}
                            alt="favicon"
                          />
                          <Button
                            size="small"
                            color="error"
                            onClick={() => favicon.remove(idx)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              minWidth: 24,
                            }}
                          >
                            X
                          </Button>
                        </Card>
                      ))}
                    </Box>
                  </Grid>
                  {/* Top image */}
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <Typography variant="body2">Ảnh đầu trang:</Typography>

                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload ảnh đầu trang
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => top.onChange(e.target.files)}
                        />
                      </Button>
                      {top.previews.map((url, idx) => (
                        <Card
                          key={idx}
                          sx={{ width: 200, mt: 1, position: "relative" }}
                        >
                          <CardMedia component="img" image={url} alt="top" />
                          <Button
                            size="small"
                            color="error"
                            onClick={() => top.remove(idx)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              minWidth: 24,
                            }}
                          >
                            X
                          </Button>
                        </Card>
                      ))}
                    </Box>
                  </Grid>
                  {/* Form image */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">
                      Ảnh nền form đơn hàng:
                    </Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload ảnh Form
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => orderForm.onChange(e.target.files)}
                        />
                      </Button>
                      {orderForm.previews.map((url, idx) => (
                        <Card
                          key={idx}
                          sx={{ width: 200, mt: 1, position: "relative" }}
                        >
                          <CardMedia component="img" image={url} alt="form" />
                          <Button
                            size="small"
                            color="error"
                            onClick={() => orderForm.remove(idx)}
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              minWidth: 24,
                            }}
                          >
                            X
                          </Button>
                        </Card>
                      ))}
                    </Box>
                  </Grid>

                  {/* ẢNH SLIDE SẢN PHẨM */}
                  <Grid item xs={12}>
                    <Typography variant="body2">Ảnh slide sản phẩm:</Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload ảnh slide
                        <input
                          hidden
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(e) => slides.onChange(e.target.files)}
                        />
                      </Button>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 1, flexWrap: "wrap" }}
                      >
                        {slides.previews.map((url, idx) => (
                          <Card
                            key={idx}
                            sx={{ width: 200, position: "relative" }}
                          >
                            <CardMedia
                              component="img"
                              image={url}
                              alt={`slide-${idx}`}
                            />
                            <Button
                              size="small"
                              color="error"
                              onClick={() => slides.remove(idx)}
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                minWidth: 24,
                              }}
                            >
                              X
                            </Button>
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                  {/* ẢNH CHI TIẾT SẢN PHẨM */}
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Danh sách ảnh chi tiết sản phẩm:
                    </Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload ảnh chi tiết
                        <input
                          hidden
                          multiple
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            detailImages.onChange(e.target.files)
                          }
                        />
                      </Button>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 1, flexWrap: "wrap" }}
                      >
                        {detailImages.previews.map((url, idx) => (
                          <Card
                            key={idx}
                            sx={{ width: 200, position: "relative" }}
                          >
                            <CardMedia
                              component="img"
                              image={url}
                              alt={`detail-${idx}`}
                            />
                            <Button
                              size="small"
                              color="error"
                              onClick={() => detailImages.remove(idx)}
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                minWidth: 24,
                              }}
                            >
                              X
                            </Button>
                          </Card>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Mô tả
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid rgba(0,0,0,0.23)",
                        borderRadius: 1,
                        "& .ql-container": {
                          border: "none",
                          borderRadius: 1,
                          minHeight: "150px",
                        },
                        "& .ql-toolbar": {
                          border: "none",
                          borderBottom: "1px solid rgba(0,0,0,0.23)",
                          borderRadius: "4px 4px 0 0",
                        },
                      }}
                    >
                      <ReactQuill
                        theme="snow"
                        value={values.description}
                        onChange={(content) =>
                          setFieldValue("description", content)
                        }
                        modules={modules}
                      />
                    </Box>
                    {touched.description && errors.description && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        {errors.description}
                      </Typography>
                    )}
                  </Grid>

                  {/* Details */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Chi tiết sản phẩm
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid rgba(0,0,0,0.23)",
                        borderRadius: 1,
                        "& .ql-container": {
                          border: "none",
                          borderRadius: 1,
                          minHeight: "150px",
                        },
                        "& .ql-toolbar": {
                          border: "none",
                          borderBottom: "1px solid rgba(0,0,0,0.23)",
                          borderRadius: "4px 4px 0 0",
                        },
                      }}
                    >
                      <ReactQuill
                        theme="snow"
                        value={values.details}
                        onChange={(content) =>
                          setFieldValue("details", content)
                        }
                        modules={modules}
                      />
                    </Box>
                  </Grid>

                  {/* URL */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="URL sản phẩm"
                      name="urlProduct"
                      value={values.urlProduct}
                      onChange={handleChange}
                      error={touched.urlProduct && !!errors.urlProduct}
                      helperText={touched.urlProduct && errors.urlProduct}
                    />
                  </Grid>

                  {/* Purchase Options */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Tuỳ chọn mua hàng
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        value={purchaseOption.option}
                        onChange={(e) =>
                          setPurchaseOption((prev) => ({
                            ...prev,
                            option: e.target.value,
                          }))
                        }
                        label="Tên tuỳ chọn"
                        size="small"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddOption(values, setFieldValue);
                          }
                        }}
                      />
                      <TextField
                        type="number"
                        value={purchaseOption.totalPrice}
                        onChange={(e) =>
                          setPurchaseOption((prev) => ({
                            ...prev,
                            totalPrice: Number(e.target.value),
                          }))
                        }
                        label="Giá"
                        size="small"
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleAddOption(values, setFieldValue)}
                      >
                        Thêm
                      </Button>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {values.purchaseOptions?.map((opt, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            mb: 1,
                          }}
                        >
                          <Typography>
                            {opt.option} 
                          </Typography>
                          <Button
                            size="small"
                            color="error"
                            onClick={() =>
                              handleRemoveOption(opt, values, setFieldValue)
                            }
                            sx={{ ml: 1, minWidth: 0 }}
                          >
                            X
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>

                  {/* Features section */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Dòng chữ trên order form
                    </Typography>
                    {/* <TextField
                      label="Dòng chữ lớn"
                      value={featureTitle}
                      onChange={(e) => setFeatureTitle(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    /> */}
                    <TextField
                      label="Dòng chữ lớn"
                      value={values.features.title}
                      onChange={(e) =>
                        setFieldValue("features.title", e.target.value)
                      }
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <TextField
                        value={featureItem}
                        onChange={(e) => setFeatureItem(e.target.value)}
                        label="Nhập các dòng chữ nhỏ"
                        size="small"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (featureItem.trim()) {
                              setFieldValue("features.items", [
                                ...values.features.items,
                                featureItem.trim(),
                              ]);
                              setFeatureItem("");
                            }
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (featureItem.trim()) {
                            setFieldValue("features.items", [
                              ...values.features.items,
                              featureItem.trim(),
                            ]);
                            setFeatureItem("");
                          }
                        }}
                      >
                        Thêm
                      </Button>
                    </Box>
                    {/* HIỂN THỊ CÁC DANH SÁCH ITEM CỦA DÒNG CHỮ 
                        TRÊN ORDER FORM VỪA NHẬP */}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap", mb: 1 }}
                    >
                      {values.features.items.map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            px: 1,
                            py: 0.5,
                            mb: 1,
                          }}
                        >
                          <Typography>{item}</Typography>
                          <Button
                            size="small"
                            color="error"
                            onClick={() =>
                              setFieldValue(
                                "features.items",
                                values.features.items.filter((i) => i !== item)
                              )
                            }
                            sx={{ ml: 1, minWidth: 0 }}
                          >
                            X
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                    <TextField
                      label="Dòng chữ đỏ"
                      value={values.features.note}
                      onChange={(e) =>
                        setFieldValue("features.note", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
                {/* KẾT THÚC FORM */}
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={20} /> : "Lưu"}
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
