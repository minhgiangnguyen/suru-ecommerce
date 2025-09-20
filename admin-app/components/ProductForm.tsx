import React, { useState } from 'react';

type ProductInput = {
  name: string;
  favicon: string;
  topbarColor: string;
  description: string;
  category: string;
  price: number;
  salePercent: number;
  urlProduct?: string;
};

export const ProductForm: React.FC<{ initial?: Partial<ProductInput>; onSubmit: (data: ProductInput) => Promise<void> }>=({ initial, onSubmit })=>{
  const [form, setForm] = useState<ProductInput>({
    name: initial?.name || '',
    favicon: initial?.favicon || '',
    topbarColor: initial?.topbarColor || '#333333',
    description: initial?.description || '',
    category: initial?.category || '',
    price: initial?.price || 0,
    salePercent: initial?.salePercent || 0,
    urlProduct: initial?.urlProduct || '',
  });
  const [loading, setLoading] = useState(false);

  const change = (k: keyof ProductInput, v: any) => setForm((f)=>({ ...f, [k]: v }));
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(form); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 10, maxWidth: 600 }}>
      <input placeholder="Name" value={form.name} onChange={(e)=>change('name', e.target.value)} required />
      <input placeholder="Favicon URL" value={form.favicon} onChange={(e)=>change('favicon', e.target.value)} />
      <input type="color" value={form.topbarColor} onChange={(e)=>change('topbarColor', e.target.value)} />
      <textarea placeholder="Description" value={form.description} onChange={(e)=>change('description', e.target.value)} />
      <input placeholder="Category" value={form.category} onChange={(e)=>change('category', e.target.value)} />
      <input type="number" placeholder="Price" value={form.price} onChange={(e)=>change('price', Number(e.target.value))} />
      <input type="number" placeholder="Sale %" value={form.salePercent} onChange={(e)=>change('salePercent', Number(e.target.value))} />
      <input placeholder="Product URL" value={form.urlProduct} onChange={(e)=>change('urlProduct', e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
    </form>
  );
}


