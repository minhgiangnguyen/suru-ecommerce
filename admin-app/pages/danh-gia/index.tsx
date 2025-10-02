import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Chip,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Reply, Add } from "@mui/icons-material";
import { AdminLayout } from "../../components/AdminLayout";
import api from "../../services/api";
import { Formik, Form } from "formik";
import { ReviewForm, Review } from "../../components/ReviewForm";

const admin = {
  displayName: "Mimakki Việt Nam",
  avatar: "/avatar.png",
};

interface Product {
  id: number;
  name: string;
}

interface ReviewReply {
  id: number;
  authorName: string;
  avatarUrl?: string;
  comment: string;
  createdAt: string;
  day: number;
  role: "admin"|"author"
}

export default function ReviewsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // ReviewForm dialog
  const [formOpen, setFormOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | undefined>(
    undefined
  );

  // Reply dialog
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyReviewId, setReplyReviewId] = useState<number | null>(null);
  const [editReplyId, setEditReplyId] = useState<number | null>(null);
  const [replyInitialComment, setReplyInitialComment] = useState<string>("");
  const [replyMode, setReplyMode] = useState<"admin" | "author">("admin");

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // load products
  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      if (res.data && res.data.length > 0) {
        setSelectedProduct((prev) => prev ?? res.data[0].id);
      }
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách sản phẩm");
    }
  };

  // load reviews for product
  const loadReviews = async (productId: number | null) => {
    if (!productId) return;
    try {
      setLoading(true);
      const res = await api.get(`/reviews/product/${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      setError("Không thể tải đánh giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) loadReviews(selectedProduct);
  }, [selectedProduct]);

  const handleSaved = () => {
    if (selectedProduct) loadReviews(selectedProduct);
    setSelectedReview(undefined);
  };

  // Review handlers
  const openNewReview = () => {
    setSelectedReview(undefined);
    setFormOpen(true);
  };

  const openEditReview = (r: Review) => {
    setSelectedReview(r);
    setFormOpen(true);
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setSnackbar({
        open: true,
        message: "Xóa đánh giá thành công",
        severity: "success",
      });
      if (selectedProduct) loadReviews(selectedProduct);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Xóa thất bại", severity: "error" });
    }
  };

  // Reply handlers
  const openReplyModal = (review: Review, mode: "admin" | "author") => {
    setReplyReviewId(review.id);
    setEditReplyId(null);
    setReplyInitialComment("");
    setReplyMode(mode);
    setReplyOpen(true);
  };

  const openEditReplyModal = (reviewId: number, reply: ReviewReply) => {
    setReplyReviewId(reviewId);
    setEditReplyId(reply.id);
    setReplyInitialComment(reply.comment);
    setReplyMode("admin");
    setReplyOpen(true);
  };

  const handleReplySubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      if (!replyReviewId) throw new Error("Missing review id");

      const payload: any = {
        comment: values.comment,
        day: values.day,
        role: replyMode === "admin" ?"admin":"author",
      };

      // if (replyMode === "author") {
      //   const review = reviews.find((r) => r.id === replyReviewId);
      //   if (review) {
      //     payload.authorName = review.authorName;
      //     payload.avatarUrl = review.avatarUrl;
      //   }
      // }

      if (editReplyId) {
        await api.put(`/reviews/replies/${editReplyId}`, payload);
        setSnackbar({
          open: true,
          message: "Cập nhật phản hồi thành công",
          severity: "success",
        });
      } else {
        await api.post(`/reviews/${replyReviewId}/replies`, payload);
        setSnackbar({
          open: true,
          message: "Gửi phản hồi thành công",
          severity: "success",
        });
      }

      resetForm();
      setReplyOpen(false);
      setEditReplyId(null);
      if (selectedProduct) loadReviews(selectedProduct);
    } catch (err: any) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Lỗi khi gửi phản hồi",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) return;
    try {
      await api.delete(`/reviews/replies/${replyId}`);
      setSnackbar({
        open: true,
        message: "Xóa phản hồi thành công",
        severity: "success",
      });
      if (selectedProduct) loadReviews(selectedProduct);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Xóa phản hồi thất bại",
        severity: "error",
      });
    }
  };

  return (
    <AdminLayout>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5">Quản lý đánh giá</Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={openNewReview}
                  >
                    Viết đánh giá mới
                  </Button>
                </Box>

                {/* Select product */}
                <Box sx={{ mb: 2 }}>
                  <TextField
                    select
                    label="Sản phẩm"
                    value={selectedProduct ?? ""}
                    onChange={(e) => setSelectedProduct(Number(e.target.value))}
                    fullWidth
                  >
                    {products.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {error && (
                      <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                      </Typography>
                    )}

                    <List>
                      {reviews.map((r) => (
                        <React.Fragment key={r.id}>
                          <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                            <ListItemAvatar>
                              <Avatar src={r.avatarUrl ?? undefined} />
                            </ListItemAvatar>

                            <ListItemText
                              primary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography variant="subtitle1">
                                    {r.authorName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {r.day} day
                                  </Typography>
                                  {/* STAR rating */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {Array.from({ length: r.rating ?? 0 }).map(
                                      (_, i) => (
                                        <span
                                          key={i}
                                          style={{ color: "#ffb400" }}
                                        >
                                          ★
                                        </span>
                                      )
                                    )}
                                    {Array.from({
                                      length: 5 - (r.rating ?? 0),
                                    }).map((_, i) => (
                                      <span key={i} style={{ color: "#ccc" }}>
                                        ★
                                      </span>
                                    ))}
                                  </Box>
                                </Box>
                              }
                              secondary={
                                <>
                                  <Typography variant="body2">
                                    {r.comment}
                                  </Typography>
                                  {r.imageUrl && (
                                    <Box sx={{ mt: 1 }}>
                                      <img
                                        src={r.imageUrl}
                                        alt="rev"
                                        style={{ maxWidth: 200 }}
                                      />
                                    </Box>
                                  )}

                                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                    <Button
                                      size="small"
                                      startIcon={<Reply />}
                                      onClick={() => openReplyModal(r, "admin")}
                                    >
                                      Admin phản hồi
                                    </Button>
                                    <Button
                                      size="small"
                                      startIcon={<Reply />}
                                      onClick={() => openReplyModal(r, "author")}
                                    >
                                      Người dùng phản hồi
                                    </Button>
                                    <IconButton
                                      onClick={() => openEditReview(r)}
                                      title="Chỉnh sửa"
                                    >
                                      <Edit />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => handleDeleteReview(r.id)}
                                      title="Xóa"
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Box>

                                  {/* Replies */}
                                  <Box sx={{ mt: 2, pl: 3 }}>
                                    {(r.replies ?? []).map(
                                      (rep: ReviewReply) => (
                                        <Box
                                          key={rep.id}
                                          sx={{
                                            mb: 1,
                                            borderLeft: "2px solid #eee",
                                            pl: 2,
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            <Avatar
                                              src={rep.role==="admin"?admin.avatar:(r.avatarUrl ?? undefined)}
                                              sx={{ width: 24, height: 24 }}
                                            />
                                            <Typography variant="subtitle2">
                                              {rep.role==="admin"? admin.displayName: r.authorName}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                            >
                                              {rep.day} day
                                            </Typography>
                                            <Box sx={{ ml: "auto" }}>
                                              <IconButton
                                                size="small"
                                                onClick={() =>
                                                  openEditReplyModal(r.id, rep)
                                                }
                                              >
                                                <Edit fontSize="small" />
                                              </IconButton>
                                              <IconButton
                                                size="small"
                                                onClick={() =>
                                                  handleDeleteReply(rep.id)
                                                }
                                              >
                                                <Delete fontSize="small" />
                                              </IconButton>
                                            </Box>
                                          </Box>
                                          <Typography variant="body2">
                                            {rep.comment}
                                          </Typography>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                </>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Review Form Dialog */}
        <ReviewForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedReview(undefined);
          }}
          initial={selectedReview}
          productId={selectedProduct ?? undefined}
          onSaved={handleSaved}
        />

        {/* Reply Dialog */}
        <Dialog
          open={replyOpen}
          onClose={() => {
            setReplyOpen(false);
            setEditReplyId(null);
          }}
        >
          <DialogTitle>
            {editReplyId ? "Chỉnh sửa phản hồi" : "Viết phản hồi"}
          </DialogTitle>
          <Formik
            initialValues={{
              comment: replyInitialComment || "",
              day: editReplyId ? undefined : 1, // mặc định 1 nếu tạo mới
            }}
            enableReinitialize
            onSubmit={handleReplySubmit}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="Nội dung phản hồi"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                  />
                  <TextField
                    fullWidth
                    label="Day"
                    name="day"
                    type="number"
                    value={values.day ?? ""}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setReplyOpen(false);
                      setEditReplyId(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={18} />
                    ) : editReplyId ? (
                      "Cập nhật"
                    ) : (
                      "Gửi"
                    )}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>

        {/* Snackbar */}
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
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
}
