import React, { useState } from 'react';
import api from '../services/api';

type ReviewReplyFormProps = {
  reviewId: number;
  onReplyAdded?: () => void;
};

export const ReviewReplyForm: React.FC<ReviewReplyFormProps> = ({ reviewId, onReplyAdded }) => {
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;
    
    setLoading(true);
    try {
      await api.post(`/reviews/${reviewId}/replies`, {
        authorName: authorName.trim(),
        comment: comment.trim(),
      });
      setAuthorName('');
      setComment('');
      onReplyAdded?.();
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 8, padding: 12, border: '1px solid #eee', borderRadius: 4 }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <input
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write a reply..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />
        <button type="submit" disabled={loading} style={{ alignSelf: 'start' }}>
          {loading ? 'Posting...' : 'Post Reply'}
        </button>
      </div>
    </form>
  );
};

