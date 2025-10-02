import React from "react";

type ProductImage = {
  id: number;
  imageUrl: string;
  position: string;
};

type ProductGalleryProps = {
  images: ProductImage[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">Không có ảnh sản phẩm</p>;
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-center font-semibold text-2xl">CHI TIẾT VỀ SẢN PHẨM</h3>
      {images.map((img) => (
        <div key={img.id} className="w-full">
          <img
            src={img.imageUrl}
            alt={`Ảnh sản phẩm ${img.id}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
