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
      <h2>Write Review</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
        <input type="number" value={productId} onChange={(e)=>setProductId(Number(e.target.value))} placeholder="Product ID" />
        <input value={authorName} onChange={(e)=>setAuthorName(e.target.value)} placeholder="Author" />
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Comment" />
        <input type="number" value={rating} onChange={(e)=>setRating(Number(e.target.value))} placeholder="Rating (1-5)" />
        <button type="submit">Submit</button>
        {msg && <div>{msg}</div>}
      </form>
    </AdminLayout>
  );
}


