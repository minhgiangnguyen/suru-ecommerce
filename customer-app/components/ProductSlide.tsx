import React, { useState, useEffect } from "react";

export type ProductImage = { id: number; imageUrl: string; position: string };

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductSlide({ images }: ProductGalleryProps) {
  // Lọc ra chỉ những ảnh có position = 'slide'
  const slideImages = images.filter((img) => img.position === "slide");

  const [current, setCurrent] = useState(0);

  if (!slideImages.length) return null;

  // Auto slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <img
          src={slideImages[current].imageUrl}
          alt={slideImages[current].position}
          className="w-full h-auto rounded-lg transition-all duration-500"
        />
        {/* Prev/Next buttons */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex mt-2 gap-2">
        {slideImages.map((img, idx) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt={img.position}
            onClick={() => setCurrent(idx)}
            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
              idx === current ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
