import { GetServerSideProps } from "next";
import api from "../services/api";
import { ProductSlide } from "../components/ProductSlide";
import { ProductDetail } from "../components/ProductDetail";
import { OrderForm } from "../components/OrderForm";
import { Review, ReviewList } from "../components/ReviewList";
import Description from "../components/Description";
import Head from "next/head";
import ProductGallery from "../components/ProductGallery";
import CommitmentCard from "../components/CommitmentCard";
import { Policy } from "../components/Policy";
import { BottomButton } from "../components/BottomButton";
import Topbar from "../components/TopBar";
import Footer from "../components/Footer";

export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  salePercent: number;
  salePrice: number;
  topbarColor: string;
  favicon?: string;
  topImage?: string;
  formImage?: string;
  details: string; //phần thông tin chi tiết
  purchaseOptions: { totalPrice: number; option: string }[];
  buyCount: number | 0; //Lượt mua
  seoTitle: string;
  features: { items: string[]; note: string; title: string };
  reviewCount?: number;
};

type Props = {
  product: Product;
  images: {
    id: number;
    imageUrl: string;
    position: "detail" | "form";
  }[];
  reviews: Review[];
};

export default function ProductPage({ product, images, reviews }: Props) {
  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-base">
        Product not found
      </div>
    );
  }
  console.log(reviews);
  const detailImages = images.filter((img) => img.position === "detail");
  return (
    <>
      <Head>
        <title>{product.seoTitle || product.name}</title>
        <link rel="icon" href={product.favicon} />
        <meta name="seoTitle" content={product.seoTitle} />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-50 pt-12">
        {/* Main content */}
        <main className="flex-1 w-full max-w-md mx-auto">
          <Topbar color={product.topbarColor} />
          {/* Ảnh đầu trang */}
          <section>
            <img
              key={product.topImage}
              src={product.topImage}
              alt={product.topImage}
              className=" w-full"
            />
          </section>

          {/* Mô tả sản phẩm */}
          <section className="mt-2">
            <Description description={product.description} />
          </section>
          {/* Gallery */}
          <section id="slide" className="w-full">
            <ProductSlide images={images} />
          </section>
          {/* Thông tin sản phẩm (Giá,lượt xem, thông tin chi tiết) */}
          <section className="bg-white  shadow-sm p-2 mt-2">
            <ProductDetail
              name={product.name}
              details={product.details}
              price={product.price}
              salePercent={product.salePercent}
              buyCount={product.buyCount}
              salePrice={product.salePrice}
            />
          </section>
          {/* Danh sách ảnh sản phẩm */}
          <section id="gallery" className="bg-white  shadow-sm ">
            <ProductGallery images={detailImages} />
          </section>
          {/* Danh sách ảnh sản phẩm */}
          <section>
            <CommitmentCard />
          </section>
          {/* Order */}
          <section id="order" className="bg-white  shadow-sm  ">
            <OrderForm product={product} />
          </section>

          {/* Reviews */}
          <section id="reviews" className="bg-white  shadow-sm p-2">
            <div className="flex border-b border-gray-500/30 mb-2">
              <span className="text-yellow-500 ml-1">4.9 ★</span>
              <h3 className="text-lg font-semibold ml-1">
                Đánh Giá Của Khách Hàng{" "}
                {product.reviewCount ? `(${product.reviewCount})` : ""}
              </h3>
            </div>
            <ReviewList reviews={reviews} />
          </section>
          <section className="">
            <Policy />
          </section>
        </main>
        <footer className="max-w-md mx-auto">
          {/* THÔNG TIN CÔNG TY */}
          <Footer />
          {/* 2 NÚT DÍNH BÊN DƯỚI TRANG */}
          <BottomButton salePercent={product.salePercent} />
        </footer>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const urlProduct = ctx.params?.urlProduct as string;
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const res = await fetch(`${base}/products/url/${urlProduct}`);
  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  console.log("Fetched Data:", data.viewCounts);

  return {
    props: {
      product: data as Product, // ép kiểu về Product
      images: data.images ?? [],
      reviews: data.reviews ?? [],
    },
  };
};
