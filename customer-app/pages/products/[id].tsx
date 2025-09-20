import { GetServerSideProps } from 'next';
import api from '../../services/api';
import { TopBar } from '../../components/TopBar';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductDetail } from '../../components/ProductDetail';
import { OrderForm } from '../../components/OrderForm';
import { ReviewList } from '../../components/ReviewList';

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  salePercent: number;
  topbarColor: string;
  favicon: string;
};

type Props = {
  product: Product;
  images: { id: number; imageUrl: string; position: string }[];
  features: { id: number; content: string; position: string }[];
  labels: { id: number; labelText: string }[];
  reviews: { id: number; authorName: string; rating?: number; comment: string; createdAt: string }[];
};

export default function ProductPage({ product, images, features, labels, reviews }: Props) {
  return (
    <div>
      <TopBar title={product.name} color={product.topbarColor} favicon={product.favicon} />
      <div style={{ maxWidth: 960, margin: '16px auto', padding: '0 16px', display: 'grid', gap: 24 }}>
        <ProductGallery images={images} />
        <ProductDetail name={product.name} description={product.description} category={product.category} price={product.price} salePercent={product.salePercent} />
        <section>
          <h3>Order</h3>
          <OrderForm productId={product.id} labels={labels} defaultPrice={product.price} />
        </section>
        <section>
          <h3>Features</h3>
          <ul>
            {features.map((f) => (
              <li key={f.id}>{f.content}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3>Reviews</h3>
          <ReviewList reviews={reviews} />
        </section>
      </div>
      <footer style={{ padding: 16, textAlign: 'center', color: '#777' }}>Suzu © {new Date().getFullYear()}</footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [productRes, labelsRes, imagesRes, featuresRes, reviewsRes] = await Promise.all([
    fetch(`${base}/products/${id}`),
    fetch(`${base}/products/${id}/labels`),
    fetch(`${base}/products/${id}/images`),
    fetch(`${base}/products/${id}/features`),
    fetch(`${base}/products/${id}/reviews`),
  ]);
  const [product, labels, images, features, reviews] = await Promise.all([
    productRes.json(),
    labelsRes.json(),
    imagesRes.json(),
    featuresRes.json(),
    reviewsRes.json(),
  ]);
  return { props: { product, labels, images, features, reviews } };
};


