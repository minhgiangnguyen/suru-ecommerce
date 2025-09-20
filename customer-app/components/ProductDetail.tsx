import React from 'react';

export const ProductDetail: React.FC<{ name: string; description: string; category: string; price: number; salePercent?: number }> = ({ name, description, category, price, salePercent }) => {
  const salePrice = salePercent ? price * (1 - salePercent / 100) : price;
  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>{name}</h2>
      <div style={{ color: '#666', marginBottom: 8 }}>{category}</div>
      <div style={{ fontSize: 18, marginBottom: 12 }}>
        ${salePrice.toFixed(2)} {salePercent ? <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: 8 }}>${price.toFixed(2)}</span> : null}
      </div>
      <p>{description}</p>
    </div>
  );
};


