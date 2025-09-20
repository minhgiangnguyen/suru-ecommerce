import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import api from '../../services/api';
import { ProductForm } from '../../components/ProductForm';

type Product = { id: number; name: string };

export default function ProductsPage(){
  const [products, setProducts] = useState<Product[]>([]);

  const load = async ()=>{
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const create = async (data: any)=>{
    await api.post('/products', data);
    await load();
  };

  return (
    <AdminLayout>
      <h2>Products</h2>
      <ProductForm onSubmit={create} />
      <ul>
        {products.map(p=> <li key={p.id}>{p.name}</li>)}
      </ul>
    </AdminLayout>
  );
}


