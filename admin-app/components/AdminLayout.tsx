import React from 'react';
import Link from 'next/link';

export const AdminLayout: React.FC<{ children: React.ReactNode }>=({ children })=>{
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #eee', padding: 16 }}>
        <h3>Suzu Admin</h3>
        <nav style={{ display: 'grid', gap: 8 }}>
          <Link href="/dashboard">Bảng điều khiển</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/orders">Đơn hàng</Link>
          <Link href="/reviews/write">Viết đánh giá</Link>
        </nav>
      </aside>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}


