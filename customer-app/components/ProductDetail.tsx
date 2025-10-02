import React from "react";

export const ProductDetail: React.FC<{
  name: string;
  details: string;
  price: number;
  salePercent: number;
  salePrice: number;
  viewCount: number;
}> = ({ name, details, price, salePercent, viewCount, salePrice }) => {
  // const salePrice = salePercent ? price * (1 - salePercent / 100) : price;
  // Hàm scroll đến section
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="space-y-3">
      {/* Tên sản phẩm */}
      <h2 className="text-2xl font-semibold">{name}</h2>

      {/* Giá + sale */}
      <div className="flex items-end gap-2 text-3xl font-bold text-red-600">
        <span>
          {salePrice.toLocaleString("vi-VN")}
          <span className="underline">đ</span>
        </span>

        {salePercent ? (
          <>
            <span className="text-black font-semibold line-through text-base ">
              {price.toLocaleString("vi-VN")}
              <span className="underline">đ</span>
            </span>
            <span className="text-red-600 text-base font-semibold">
              -{salePercent}%
            </span>
          </>
        ) : null}
      </div>

      {/* Sao + lượt xem */}
      <div className="flex items-center gap-2 text-lg">
        <span className="text-yellow-500">4.9 ★ ★ ★ ★ ★</span>
        <span className="text-blue-600 text-sm font-semibold underline cursor-pointer">
          {viewCount?.toLocaleString("vi-VN") || "0"} lượt mua
        </span>
      </div>

      {/* Nút mua ngay */}
      <button
        onClick={() => scrollTo("order")}
        className="bg-red-600 text-white w-full py-3 rounded-md font-semibold text-lg"
      >
        MUA NGAY
      </button>

      {/* Text nhỏ dưới nút */}
      <p className="text-center text-sm text-gray-700 font-semibold">
        Miễn phí vận chuyển / Trả hàng miễn phí 15 ngày
      </p>

      {/* Các nút phụ */}
      <div className="flex justify-between gap-2">
        <button
          onClick={() => scrollTo("reviews")}
          className="flex-1 bg-[#88B8A9] py-2 rounded-md font-semibold text-sm text-white "
        >
          ĐÁNH GIÁ CỦA KHÁCH HÀNG
        </button>
        <button
          onClick={() => scrollTo("gallery")}
          className="flex-1 bg-[#88B8A9] py-2 rounded-md font-semibold text-sm text-white"
        >
          CHI TIẾT SẢN PHẨM
        </button>
        <button
          onClick={() => scrollTo("effect")}
          className="flex-1 bg-[#88B8A9] py-2 rounded-md font-semibold text-sm text-white "
        >
          TÁC DỤNG
        </button>
      </div>

      {/* Render chi tiết */}
      <div
        dangerouslySetInnerHTML={{ __html: details }}
        className="prose prose-sm mt-2 border-t-2 border-b-2 py-2 border-gray-200"
      />
    </div>
  );
};
