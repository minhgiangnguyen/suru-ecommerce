import React from 'react';

type Order = {
  id: number;
  totalPrice: number;
  receiveStatus: string;
  transferStatus: string;
  createdAt: string;
  customer: { name: string; phone: string };
  product: { name: string };
  quantityLabel: { labelText: string };
};

export const OrdersTable: React.FC<{ orders: Order[]; onUpdate: (id: number, data: { receiveStatus?: string; transferStatus?: string }) => void }>=({ orders, onUpdate })=>{
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Label</th>
          <th>Total</th>
          <th>Receive</th>
          <th>Transfer</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o)=> (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.customer.name} ({o.customer.phone})</td>
            <td>{o.product.name}</td>
            <td>{o.quantityLabel.labelText}</td>
            <td>${o.totalPrice.toFixed(2)}</td>
            <td>{o.receiveStatus}</td>
            <td>{o.transferStatus}</td>
            <td>{new Date(o.createdAt).toLocaleString()}</td>
            <td>
              <button onClick={()=>onUpdate(o.id, { receiveStatus: 'received' })}>Mark Received</button>
              <button onClick={()=>onUpdate(o.id, { transferStatus: 'transferred' })} style={{ marginLeft: 8 }}>Mark Transferred</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


