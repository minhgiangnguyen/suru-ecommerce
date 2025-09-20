import React from 'react';

export type ProductImage = { id: number; imageUrl: string; position: string };

export const ProductGallery: React.FC<{ images: ProductImage[] }> = ({ images }) => {
  if (!images?.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      {images.map((img) => (
        <img key={img.id} src={img.imageUrl} alt={img.position} style={{ width: '100%', height: 'auto', borderRadius: 6 }} />
      ))}
    </div>
  );
};


