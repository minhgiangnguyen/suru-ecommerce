import React from 'react';
import Link from 'next/link';

export const AdminLayout: React.FC<{ children: React.ReactNode }>=({ children })=>{
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #eee', padding: 16 }}>
        <h3>Suzu Admin</h3>
        <nav style={{ display: 'grid', gap: 8 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/reviews/write">Write Review</Link>
        </nav>
      </aside>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}


