import React from 'react';

type Review = { id: number; authorName: string; rating?: number; comment: string; createdAt: string };

export const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  if (!reviews?.length) return <div>Chưa có đánh giá.</div>;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {reviews.map((r) => (
        <div key={r.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
          <div style={{ fontWeight: 600 }}>{r.authorName} {r.rating ? `- ${r.rating}/5` : ''}</div>
          <div style={{ color: '#666', fontSize: 12 }}>{new Date(r.createdAt).toLocaleString()}</div>
          <div>{r.comment}</div>
        </div>
      ))}
    </div>
  );
};


