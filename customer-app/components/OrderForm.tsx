import React, { useState } from 'react';
import api from '../services/api';

type Label = { id: number; labelText: string };

export const OrderForm: React.FC<{ productId: number; labels: Label[]; onCreated?: () => void; defaultPrice: number }>
  = ({ productId, labels, onCreated, defaultPrice }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantityLabelId, setQuantityLabelId] = useState(labels[0]?.id);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', {
        customer: { name, phone, address },
        productId,
        quantityLabelId,
        totalPrice: defaultPrice,
      });
      onCreated?.();
      setName(''); setPhone(''); setAddress('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
      <label>
        <div>Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        <div>Phone</div>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <label>
        <div>Address</div>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <label>
        <div>Quantity</div>
        <select value={quantityLabelId} onChange={(e) => setQuantityLabelId(Number(e.target.value))}>
          {labels.map((l) => (
            <option key={l.id} value={l.id}>{l.labelText}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Order'}</button>
    </form>
  );
};


