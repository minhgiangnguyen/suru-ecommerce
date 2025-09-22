import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import api from '../services/api';
import { OrdersTable } from '../components/OrdersTable';

export default function OrdersPage(){
  const [orders, setOrders] = useState<any[]>([]);

  const load = async ()=>{
    const res = await api.get('/orders');
    setOrders(res.data);
  };
  useEffect(()=>{ load(); }, []);

  const update = async (id: number, data: any)=>{
    await api.patch(`/orders/${id}`, data);
    await load();
  }

  return (
    <AdminLayout>
      <h2>Đơn hàng</h2>
      <OrdersTable orders={orders} onUpdate={update} />
    </AdminLayout>
  );
}


