// components/ReviewsSection.tsx
import React, { useEffect, useState } from "react";
import {
  Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Button, IconButton, Divider, Chip, CircularProgress, Snackbar, Alert
} from "@mui/material";
import { Reply, Edit, Delete } from "@mui/icons-material";
import api from "../services/api";

interface Review {
  id: number;
  authorName: string;
  avatarUrl?: string | null;
  imageUrl?: string | null;
  comment: string;
  rating?: number;
  createdAt?: string;
  replies?: ReplyType[];
}

interface ReplyType {
  id: number;
  authorName: string;
  avatarUrl?: string | null;
  comment: string;
  role?: string;
  createdAt?: string;
}

const currentAdmin = {
  displayName: "Admin",
  avatar: "/placeholder-avatar.png"
};

export default function ReviewsSection({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // modal states
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyMode, setReplyMode] = useState<"admin"|"user">("admin");
  const [targetReview, setTargetReview] = useState<Review | null>(null);
  const [editReply, setEditReply] = useState<ReplyType | null>(null);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{open:boolean;message:string;severity:"success"|"error"}>({open:false,message:"",severity:"success"});

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reviews/product/${productId}`);
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Không tải được đánh giá", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [productId]);

  const openReply = (rev: Review, mode: "admin"|"user") => {
    setTargetReview(rev);
    setReplyMode(mode);
    setEditReply(null);
    setReplyOpen(true);
  };

  const openEditReply = (rev: Review, reply: ReplyType) => {
    setTargetReview(rev);
    setReplyMode("admin"); // edit via admin UI, role preserved server-side
    setEditReply(reply);
    setReplyOpen(true);
  };

  const handleReplySaved = () => {
    setReplyOpen(false);
    setEditReply(null);
    load();
  };

  const handleDeleteReply = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa phản hồi?")) return;
    try {
      await api.delete(`/reviews/replies/${id}`);
      setSnackbar({ open: true, message: "Xóa phản hồi thành công", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Xóa thất bại", severity: "error" });
    }
  };

  return (
    <Box>
      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:2 }}>
        <Typography variant="h6">Đánh giá</Typography>
        <Button variant="outlined" onClick={() => setReviewFormOpen(true)}>Viết đánh giá</Button>
      </Box>

      {loading ? <CircularProgress /> : (
        <List>
          {reviews.map(r => (
            <React.Fragment key={r.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar><Avatar src={r.avatarUrl ?? "/placeholder-avatar.png"} /></ListItemAvatar>
                <ListItemText
                  primary={<Box sx={{display:"flex", gap:1, alignItems:"center"}}><Typography>{r.authorName}</Typography><Chip label={r.rating ?? "-"} size="small" /></Box>}
                  secondary={<>
                    <Typography variant="body2">{r.comment}</Typography>
                    {r.imageUrl && <Box sx={{mt:1}}><img src={r.imageUrl} alt="rev" style={{maxWidth:240}}/></Box>}
                    <Box sx={{display:"flex", gap:1, mt:1}}>
                      <Button size="small" startIcon={<Reply />} onClick={() => openReply(r, "admin")}>Admin phản hồi</Button>
                      <Button size="small" startIcon={<Reply />} onClick={() => openReply(r, "user")}>Người dùng phản hồi</Button>
                    </Box>

                    {/* replies */}
                    <Box sx={{mt:2, pl:3}}>
                      {(r.replies || []).map(rep => (
                        <Box key={rep.id} sx={{mb:1, borderLeft:"2px solid #eee", pl:2}}>
                          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Box>
                              <Typography variant="subtitle2">{rep.authorName} {rep.role === "admin" ? "(Admin)" : ""}</Typography>
                              <Typography variant="caption" color="text.secondary">{rep.createdAt ? new Date(rep.createdAt).toLocaleString() : ""}</Typography>
                            </Box>
                            <Box>
                              <IconButton size="small" onClick={() => openEditReply(r, rep)}><Edit fontSize="small" /></IconButton>
                              <IconButton size="small" onClick={() => handleDeleteReply(rep.id)}><Delete fontSize="small" /></IconButton>
                            </Box>
                          </Box>
                          <Typography variant="body2">{rep.comment}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </>}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={()=>setSnackbar({...snackbar, open:false})} anchorOrigin={{vertical:"bottom", horizontal:"right"}}>
        <Alert onClose={()=>setSnackbar({...snackbar, open:false})} severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
