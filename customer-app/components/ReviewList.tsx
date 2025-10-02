import React from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const admin = {
  displayName: "Mimakki Việt Nam",
  avatar: "/avatar.png",
};

export type Review = {
  id: number;
  authorName: string;
  avatarUrl?: string; //avatar người bình luận
  imageUrl?: string; //ảnh trong bình luận
  rating?: number;
  comment: string;
  day: number;
  replies?: ReviewReply[];
};

export interface ReviewReply {
  id: number;
  comment: string;
  day: number;
  role: "admin" | "author";
}

export const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="flex gap-3">
          {/* Avatar */}
          <img
            src={r.avatarUrl ?? "/default-avatar.png"}
            alt={r.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            {/* Tên + rating */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">{r.authorName}</span>
              <div className="flex text-yellow-400 text-sm">
                {Array.from({ length: r.rating ?? 0 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {Array.from({ length: 5 - (r.rating ?? 0) }).map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Nội dung */}
            <p className="text-sm whitespace-pre-line">{r.comment}</p>

            {/* Hình ảnh trong bình luận */}
            {r.imageUrl && (
              <div className="mt-2">
                <img
                  src={r.imageUrl}
                  alt="review"
                  className="max-w-[200px] rounded-md"
                />
              </div>
            )}

            {/* Like + Reply + Day */}
            <div className="flex gap-3 text-xs text-blue-500 mt-1">
              <button type="button">Like</button>
              <button type="button">Reply</button>
              <span className="text-gray-500">{r.day} day</span>
            </div>

            {/* Replies */}
            <div className="mt-3 space-y-4 ">
              {(r.replies ?? []).map((rep: ReviewReply) => (
                <div key={rep.id} className="flex gap-2">
                  <img
                    src={
                      rep.role === "admin"
                        ? admin.avatar // dùng avatar admin từ const
                        : r.avatarUrl ?? "/default-avatar.png"
                    }
                    alt={rep.role}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-sm">
                      {rep.role === "admin"
                        ? admin.displayName // dùng displayName admin
                        : r.authorName}
                    </span>
                    <p className="text-sm">{rep.comment}</p>
                    <div className="flex gap-3 text-xs text-blue-500 mt-0.5">
                      <button type="button">Like</button>
                      <button type="button">Reply</button>
                      <span className="text-gray-500">{rep.day} day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
