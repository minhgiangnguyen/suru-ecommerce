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
  CircularProgress,
  Avatar,
  Alert,
  Snackbar,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import api from "../services/api";

interface UserProfile {
  id: number;
  username: string;
  role: string;
  displayName?: string;
  avatar?: string;
}

interface AccountFormProps {
  open: boolean;
  onClose: () => void;
  initial?: UserProfile;
  onSaved: () => void;
}

const AccountSchema = Yup.object().shape({
  displayName: Yup.string().required("Tên hiển thị là bắt buộc"),
  username: Yup.string().required("Tên đăng nhập là bắt buộc"),
  password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .optional(),
});

export const AccountForm: React.FC<AccountFormProps> = ({
  open,
  onClose,
  initial,
  onSaved,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    initial?.avatar || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    setAvatarPreview(initial?.avatar || null);
  }, [initial]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    try {
      const updateData: any = {
        displayName: values.displayName,
        username: values.username,
      };

      // Chỉ thêm password nếu có nhập
      if (values.password) {
        updateData.password = values.password;
      }

      // Upload avatar nếu có
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const uploadResponse = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updateData.avatar = uploadResponse.data.url;
      }

      await api.put("/users/profile", updateData);

      setSnackbar({
        open: true,
        message: "Cập nhật thành công",
        severity: "success",
      });
      onSaved();
      onClose();
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Có lỗi xảy ra",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thông tin tài khoản</DialogTitle>
      <Formik
        initialValues={{
          displayName: initial?.displayName || "",
          username: initial?.username || "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={AccountSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                {/* Avatar Upload */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Avatar
                      src={avatarPreview || undefined}
                      sx={{ width: 80, height: 80 }}
                    />
                    <Box>
                      <input
                        type="file"
                        hidden
                        ref={avatarInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                      />
                      <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={isSubmitting}
                      >
                        Tải lên ảnh đại diện
                      </Button>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1 }}
                      >
                        Hỗ trợ: JPG, PNG, GIF (tối đa 2MB)
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Display Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên hiển thị"
                    name="displayName"
                    value={values.displayName}
                    onChange={handleChange}
                    error={touched.displayName && !!errors.displayName}
                    helperText={touched.displayName && errors.displayName}
                  />
                </Grid>

                {/* Username */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tên đăng nhập"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                </Grid>

                {/* Role (readonly) */}
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vai trò"
                    name="role"
                    value={initial?.role || ""}
                    disabled
                    helperText="Vai trò không thể thay đổi"
                  />
                </Grid> */}

                {/* Password */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
