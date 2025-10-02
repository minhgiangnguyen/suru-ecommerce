// src/pages/admin/components/ReviewForm.tsx
import React, { useRef, useState, useEffect } from "react";
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
  Rating,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import api from "../services/api";

export interface Review {
  id: number;
  productId?: number;
  authorName: string;
  avatarUrl?: string | null;
  imageUrl?: string | null;
  rating?: number | null;
  comment: string;
  createdAt?: string;
  day: number;
  replies?: any[];
}

interface ReviewFormProps {
  open: boolean;
  onClose: () => void;
  initial?: Review | undefined; // nếu có => edit, nếu undefined => create
  productId?: number | null; // cần khi tạo mới
  onSaved: () => void; // gọi lại khi lưu xong để refresh
}

const ReviewSchema = Yup.object().shape({
  authorName: Yup.string().required("Tên là bắt buộc"),
  comment: Yup.string().required("Bình luận là bắt buộc"),
  rating: Yup.number().min(1, "Tối thiểu 1").max(5, "Tối đa 5").required(),
  day: Yup.number()
    .min(0, "Phải lớn hơn hoặc bằng 0")
    .required("Ngày là bắt buộc"),
});

export const ReviewForm: React.FC<ReviewFormProps> = ({
  open,
  onClose,
  initial,
  productId,
  onSaved,
}) => {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initial?.avatarUrl ?? null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    initial?.imageUrl ?? null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // sync initial -> previews when open/initial changes
  useEffect(() => {
    setAvatarPreview(initial?.avatarUrl ?? null);
    setImagePreview(initial?.imageUrl ?? null);
    setAvatarFile(null);
    setImageFile(null);
  }, [initial, open]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      let reviewId: number | null = null;

      // payload chung (không bao gồm file)
      const payload: any = {
        authorName: values.authorName,
        comment: values.comment,
        rating: values.rating,
        day: values.day, 
      };

      if (initial && initial.id) {
        // update review
        await api.put(`/reviews/${initial.id}`, payload);
        reviewId = initial.id;
      } else {
        // tạo mới review: cần productId
        if (!productId) {
          throw new Error("Missing productId for creating review");
        }
        const res = await api.post(`/reviews/product/${productId}`, payload);
        // backend trả review mới (ít nhất id)
        reviewId = res.data?.id;
      }

      // upload avatar nếu có
      if (avatarFile && reviewId) {
        const fd = new FormData();
        fd.append("file", avatarFile);
        await api.post(`/reviews/${reviewId}/upload/avatar`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // upload image nếu có
      if (imageFile && reviewId) {
        const fd = new FormData();
        fd.append("file", imageFile);
        await api.post(`/reviews/${reviewId}/upload/image`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSnackbar({
        open: true,
        message: initial
          ? "Cập nhật đánh giá thành công"
          : "Tạo đánh giá thành công",
        severity: "success",
      });

      onSaved();
      onClose();
    } catch (err: any) {
      console.error("ReviewForm save error:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || err.message || "Có lỗi xảy ra",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initial ? "Chỉnh sửa đánh giá" : "Viết đánh giá"}
      </DialogTitle>

      <Formik
        initialValues={{
          authorName: initial?.authorName ?? "",
          comment: initial?.comment ?? "",
          rating: initial?.rating ?? 5,
          day: initial?.day ?? 0, // thêm day
        }}
        validationSchema={ReviewSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                {/* Avatar */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar
                      src={avatarPreview ?? undefined}
                      sx={{ width: 72, height: 72 }}
                    />
                    <Box>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={avatarInputRef}
                        onChange={handleAvatarChange}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={isSubmitting}
                      >
                        Tải ảnh đại diện
                      </Button>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        JPG, PNG (tối đa 5MB)
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Image */}
                <Grid item xs={12}>
                  {imagePreview && (
                    <Box sx={{ mb: 1 }}>
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={{ maxHeight: 120, borderRadius: 6 }}
                      />
                    </Box>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={imageInputRef}
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => imageInputRef.current?.click()}
                    disabled={isSubmitting}
                  >
                    Tải ảnh minh họa
                  </Button>
                </Grid>

                {/* Author */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên"
                    name="authorName"
                    value={values.authorName}
                    onChange={handleChange}
                    error={touched.authorName && !!errors.authorName}
                    helperText={touched.authorName && errors.authorName}
                    disabled={isSubmitting}
                  />
                </Grid>

                {/* Rating */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Đánh giá</Typography>
                  <Rating
                    value={values.rating ?? 5}
                    onChange={(_, val) => setFieldValue("rating", val ?? 5)}
                    disabled={isSubmitting}
                  />
                  {touched.rating && errors.rating && (
                    <Typography color="error" variant="caption" display="block">
                      {errors.rating}
                    </Typography>
                  )}
                </Grid>
                {/* Day */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Ngày"
                    name="day"
                    value={values.day}
                    onChange={handleChange}
                    error={touched.day && !!errors.day}
                    helperText={touched.day && errors.day}
                    disabled={isSubmitting}
                  />
                </Grid>
                {/* Comment */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Bình luận"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                    error={touched.comment && !!errors.comment}
                    helperText={touched.comment && errors.comment}
                    disabled={isSubmitting}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>
                Hủy
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} /> : "Lưu"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>

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
    </Dialog>
  );
};
