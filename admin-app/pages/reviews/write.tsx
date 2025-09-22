import React, { useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import api from '../../services/api';

export default function WritingReviewPage(){
  const [productId, setProductId] = useState<number>(1);
  const [authorName, setAuthorName] = useState('Admin');
  const [comment, setComment] = useState('Great!');
  const [rating, setRating] = useState<number>(5);
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent)=>{
    e.preventDefault();
    setMsg('');
    await api.post(`/products/${productId}/reviews`, { authorName, comment, rating });
    setMsg('Submitted');
  }

  return (
    <AdminLayout>
      <h2>Viết đánh giá</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input type="number" value={productId} onChange={(e)=>setProductId(Number(e.target.value))} placeholder="ID sản phẩm" />
        <input value={authorName} onChange={(e)=>setAuthorName(e.target.value)} placeholder="Tác giả" />
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Nội dung" />
        <input type="number" value={rating} onChange={(e)=>setRating(Number(e.target.value))} placeholder="Đánh giá (1-5)" />
        <button type="submit">Gửi</button>
        {msg && <div>{msg}</div>}
      </form>
    </AdminLayout>
  );
}


