--
-- PostgreSQL database dump
--

\restrict D2Ng1vy98lTHUcNNvmSeeBQGmtmMV4hnLd9SybsxlcsmrgVdr4OUUDyq81pbThP

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_productId_fkey";
ALTER TABLE ONLY public."ReviewReply" DROP CONSTRAINT "ReviewReply_reviewId_fkey";
ALTER TABLE ONLY public."ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";
ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_productId_fkey";
ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_customerId_fkey";
DROP INDEX public."User_username_key";
DROP INDEX public."Product_urlProduct_key";
DROP INDEX public."Order_customerId_key";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."Review" DROP CONSTRAINT "Review_pkey";
ALTER TABLE ONLY public."ReviewReply" DROP CONSTRAINT "ReviewReply_pkey";
ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
ALTER TABLE ONLY public."ProductImage" DROP CONSTRAINT "ProductImage_pkey";
ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "Customer_pkey";
ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."ReviewReply" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Review" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."ProductImage" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Product" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Order" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Customer" ALTER COLUMN id DROP DEFAULT;
DROP TABLE public._prisma_migrations;
DROP SEQUENCE public."User_id_seq";
DROP TABLE public."User";
DROP SEQUENCE public."Review_id_seq";
DROP SEQUENCE public."ReviewReply_id_seq";
DROP TABLE public."ReviewReply";
DROP TABLE public."Review";
DROP SEQUENCE public."Product_id_seq";
DROP SEQUENCE public."ProductImage_id_seq";
DROP TABLE public."ProductImage";
DROP TABLE public."Product";
DROP SEQUENCE public."Order_id_seq";
DROP TABLE public."Order";
DROP SEQUENCE public."Customer_id_seq";
DROP TABLE public."Customer";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Customer" (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL
);


--
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "productId" integer NOT NULL,
    "totalPrice" double precision NOT NULL,
    "receiveStatus" text NOT NULL,
    "transferStatus" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "purchaseOption" text
);


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    favicon text,
    "topbarColor" text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    "salePercent" integer DEFAULT 0 NOT NULL,
    "urlProduct" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    details text DEFAULT ''::text NOT NULL,
    purchase_options jsonb,
    features jsonb,
    "seoTitle" text DEFAULT ''::text NOT NULL,
    "formImage" text,
    "topImage" text,
    "reviewCount" integer,
    "buyCount" integer DEFAULT 0 NOT NULL,
    "salePrice" integer DEFAULT 0 NOT NULL
);


--
-- Name: ProductImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProductImage" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "imageUrl" text NOT NULL,
    "position" text NOT NULL
);


--
-- Name: ProductImage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ProductImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ProductImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ProductImage_id_seq" OWNED BY public."ProductImage".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "authorName" text NOT NULL,
    "avatarUrl" text,
    "imageUrl" text,
    rating integer,
    comment text NOT NULL,
    day integer NOT NULL
);


--
-- Name: ReviewReply; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReviewReply" (
    id integer NOT NULL,
    "reviewId" integer NOT NULL,
    comment text NOT NULL,
    day integer NOT NULL,
    role text DEFAULT 'author'::text NOT NULL
);


--
-- Name: ReviewReply_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ReviewReply_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ReviewReply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ReviewReply_id_seq" OWNED BY public."ReviewReply".id;


--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    "passwordHash" text NOT NULL,
    role text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    avatar text,
    "displayName" text
);


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductImage id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage" ALTER COLUMN id SET DEFAULT nextval('public."ProductImage_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: ReviewReply id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReply" ALTER COLUMN id SET DEFAULT nextval('public."ReviewReply_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Customer" (id, name, phone, address) FROM stdin;
1	Minh Giang Nguyen	0343906295	So nha 2b-Phường Vạn Phúc-Quận Hà Đông-Thành phố Hà Nội
2	Minh Giang Nguyen	0343906295	So nha 2b-Phường Vạn Phúc-Quận Hà Đông-Thành phố Hà Nội
3	Minh Giang Nguyen	0343906295	So nha 2b-Phường Vạn Phúc-Quận Hà Đông-Thành phố Hà Nội
4	Nguyễn Văn A	0123456789	So nha 32-Phường Đa Kao-Quận 1-Thành phố Hồ Chí Minh
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Order" (id, "customerId", "productId", "totalPrice", "receiveStatus", "transferStatus", "createdAt", "purchaseOption") FROM stdin;
1	3	118	3990000	pending	transferred	2025-09-29 14:30:02.912	- Micro TV bản không có pin 3.990k Miễn phí vận chuyển
2	4	118	4590000	pending	pending	2025-09-30 03:08:52.365	- Micro TV bản có pin 4.590k Miễn phí vận chuyển
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Product" (id, name, favicon, "topbarColor", description, price, "salePercent", "urlProduct", "createdAt", "updatedAt", details, purchase_options, features, "seoTitle", "formImage", "topImage", "reviewCount", "buyCount", "salePrice") FROM stdin;
115	Miếng Dán Chân Ngải Cứu	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637287/products/favicons/iadgblfxnh2kaibtgjwd.png	#da4e4e	<p>Miếng dán chân ngải cứu là thành tựu nghiên cứu của các bác sỹ đông y đầu ngành, thông qua việc nghiên cứu các bài thuốc cổ truyền, kết hợp với công nghệ sản xuất hiện đại. Cho ra đời sản phẩm miếng dán chân ngải cứu, hiệu quả chăm sóc sức khỏe tốt với người già, người làm việc trí óc, người mất ngủ nhiều ngày.</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h2 class="ql-align-center"><br></h2>	300000	50	dan-ngai-cuu-thai-doc	2025-09-23 14:21:11.62	2025-10-01 09:16:32.829	<p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Số lượng:</strong><span style="color: rgb(0, 0, 0);">&nbsp;50 miếng dán</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Nguyên liệu</strong><span style="color: rgb(0, 0, 0);">: Tự nhiên</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Thương hiệu</strong><span style="color: rgb(0, 0, 0);">: Old Beijing&nbsp;</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Kích thước</strong><span style="color: rgb(0, 0, 0);">: 20x15x10cm</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;</span><strong style="color: rgb(0, 0, 0);">Công dụng vượt trội</strong></p><p><strong>&nbsp;-</strong><span style="color: rgb(0, 0, 0);">&nbsp;Giữ ấm gan bàn chân</span></p><p><span style="color: rgb(0, 0, 0);">&nbsp;- Hỗ trợ thải độc</span></p><p><span style="color: rgb(0, 0, 0);">&nbsp;- Hỗ trợ ngủ ngon</span></p>	[{"option": "- 1 hộp 50 miếng 150 k + Miễn phí vận chuyển", "totalPrice": 150000}, {"option": "- 2 hộp 100 miếng 200 k + Miễn phí vận chuyển", "totalPrice": 200000}, {"option": "- 3 hộp 150 miếng 250 k + Miễn phí vận chuyển", "totalPrice": 250000}, {"option": "- 4 hộp 200 miếng 300 k + Miễn phí vận chuyển", "totalPrice": 300000}]	{"note": "Giảm giá cho đơn hàng từ 2 sản phẩm", "items": ["50 lần dùng", "Giữ ấm gan bàn chân", "Hỗ trợ thải độc", "Hỗ trợ giấc ngủ"], "title": "GIẢM GIÁ 50%"}	Dán ngải cứu thải độc toàn thân	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759069292/products/form-images/q4wldr5tkqmiaqixxipq.png	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759069284/products/top-images/db6zkljhgr8wfcx09jok.png	0	0	150000
123	Hộp 10 Mặt Nạ Xông Hơi Mắt	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287434/products/favicons/qgjw2kq0k5mxhzugtnxu.png	#FFA500	<p><span style="color: rgb(0, 0, 0);">Mặt nạ xông hơi mắt là thành tựu nghiên cứu của các bác sỹ đông y với nhiều năm kinh nghiệm và tâm huyết trong nghề. Với nguyên vật liệu tự nhiên, thiết kế công thái học, sản phẩm hỗ trợ trong việc thư dãn cũng như làm giảm triệu chứng nhức mỏi mắt.</span></p>	190000	50	mat-na-mat	2025-10-01 02:56:45.962	2025-10-01 09:20:52.963	<p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Hộp sản phẩm bao gồm:</strong><span style="color: rgb(0, 0, 0);">&nbsp;10 mặt nạ xông hơi mắt</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Chất liệu</strong><span style="color: rgb(0, 0, 0);">: Vải mềm với dây đeo co giãn</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Chức năng:</strong><span style="color: rgb(0, 0, 0);">&nbsp;Massage thư giãn cho mắt</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Màu sắc</strong><span style="color: rgb(0, 0, 0);">: Xanh lục</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Kích thước</strong><span style="color: rgb(0, 0, 0);">: 18x8cm</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;</span><strong style="color: rgb(0, 0, 0);">Thiết kế công thái học -</strong><span style="color: rgb(0, 0, 0);">&nbsp;Sản phẩm được nghiên cứu phát triển để ôm sát theo đường cong của khuôn mặt.</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Đối tượng sử dung:&nbsp;</strong><span style="color: rgb(0, 0, 0);">Người làm việc trí với máy tính, người già thường xuyên nhức mỏi mắt.</span></p>	[{"option": "- 2 hộp 20 mặt nạ giá 190k + Miễn phí vận chuyển", "totalPrice": 190000}, {"option": "- 3 hộp 30 mặt nạ giá 260k  + Miễn phí vận chuyển", "totalPrice": 260000}, {"option": "- 4 hộp 40 mặt nạ giá 320k  + Miễn phí vận chuyển", "totalPrice": 320000}]	{"note": "Miễn phí vận chuyển với giá tốt khi mua từ 2 hộp trở lên.", "items": ["Thiết kế được nghiên cứu sâu", "Vật liệu thân thiện", "Hiệu quả nhanh chóng", "Sử dụng dễ dàng"], "title": "GIẢM GIÁ 50%"}	Mặt nạ xông hơi mắt	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287436/products/form-images/jgfalexhvcuenp4nhfmx.png	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287435/products/top-images/rlbqbhe8pf4yu9ayzavh.png	2100	0	95000
118	Micro Vintage TV - Suru Chromatron	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710636/products/favicons/iprgwljhmvleqdty4zn6.png	#d5662a	<p><span style="color: rgb(0, 0, 0);">Tivi vỏ gỗ kiểu cổ điển Suru Chromatron là sản phẩm thủ công được các kỹ sư thiết kế và chế tạo tại Việt Nam. Là sự kết hợp hoàn hảo giữa vẻ đẹp xưa cũ với công nghệ hiện đại. Phục vụ hoàn hảo cho nhu cầu decor cũng như sử dụng để phim và nghe nhạc.&nbsp;</span></p>	3990000	0	microtv	2025-09-24 10:43:38.776	2025-10-01 09:44:26.467	<p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Số lượng:</strong><span style="color: rgb(0, 0, 0);">&nbsp;01 Tivi, 01 Bộ sạc, 01 Điều khiển giọng nói</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Nguyên liệu</strong><span style="color: rgb(0, 0, 0);">: Gỗ MDF</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Thương hiệu</strong><span style="color: rgb(0, 0, 0);">: Suru Việt Nam&nbsp;</span></p><p><span style="color: rgb(0, 0, 0);">🔹&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">Màu</strong><span style="color: rgb(0, 0, 0);">: Nâu Gỗ</span></p>	[{"option": "- Micro TV bản không có pin 3.990k Miễn phí vận chuyển", "totalPrice": 3990000}, {"option": "- Micro TV bản có pin 4.590k Miễn phí vận chuyển", "totalPrice": 4590000}]	{"note": "", "items": ["Bảo hành 1 năm từ ngày nhận hàng", "Bảo hành vận chuyển", "Bảo hành 1 đổi 1 trong 15 ngày", "Hỗ trợ phần mềm trọn đời", "Hỗ trợ nâng cấp sản phẩm trọn đời"], "title": "Chính Sách Mua Hàng"}	Micro Vintage TV - Suru Chromatron	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759069352/products/form-images/dw2spasrb42afjqq2vmq.png	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759069346/products/top-images/jqsltzqqoajgdecndjcv.png	0	0	3990000
131	Quản lý động vật hoang dã	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401146/products/favicons/eeofpxbj1gxwgrto5nub.png	#df2020	<p>abc</p>	500000	50	quanly	2025-10-02 10:31:54.923	2025-10-02 10:32:00.172	<p>abc</p>	[{"option": "1 san pham", "totalPrice": 0}]	{"note": "mua ngay", "items": ["quan ly"], "title": "giam 50%"}	Quản lý động vật hoang dã	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401148/products/form-images/kaykgrfib78niajxwtdv.png	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401147/products/top-images/sl87u9pyf7u5bx4whzhp.png	50	150	250000
130	fdf	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759400966/products/favicons/qagltnc8aocdvhumqpdu.png		<p>đá</p>	1	0	dsads	2025-10-02 10:24:36.685	2025-10-02 10:29:52.473	<p>dd</p>	[{"option": "dd", "totalPrice": 0}]	{"note": "", "items": [], "title": ""}	fdfd			1	1	1
132	ABCDSDA	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759414719/products/favicons/ijstmnl8hmy9pawdh1no.png		<p>ABC</p>	1	0	YUI	2025-10-02 14:18:06.409	2025-10-02 14:18:13.968	<p>ABC</p>	[{"option": "ĐÁ", "totalPrice": 0}]	{"note": "ĐASDA", "items": ["DSAD"], "title": "DSAD"}	ABC			0	0	1
\.


--
-- Data for Name: ProductImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProductImage" (id, "productId", "imageUrl", "position") FROM stdin;
72	123	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287437/products/images/m4qcdf3xdf9cmob2t8ku.png	slide
73	123	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287438/products/images/twnucbz7z4zpd4vduvzl.png	slide
74	123	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287439/products/images/idhdhro04yp048lghqm9.png	detail
75	123	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759287439/products/images/z4azx9kxvwu6cmbcneys.png	detail
86	130	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759400708/products/images/j8iuqyrfx9ftzhqtyklj.png	detail
87	131	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401149/products/images/wnne6uoaulihsi2usigx.png	slide
88	131	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401151/products/images/mtc5qfuwho3uswsqlryg.png	slide
89	131	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401152/products/images/up6qirzd09b6cftobxir.png	detail
90	131	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759401152/products/images/o7d4dhkjp9bvd2egp6o4.png	detail
91	132	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759414723/products/images/tbxooc4eywnw6mly32ce.png	detail
51	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637289/products/images/q3nfb3g9dddiq6kqyweq.webp	slide
52	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637291/products/images/nqp2fgyjm0utfqx6xqvs.jpg	slide
53	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637291/products/images/tdr5u4lzwwqv1kf4slbg.jpg	slide
54	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637293/products/images/xys9hvvkzwnomaobgtip.jpg	detail
55	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637293/products/images/onltckfkl3xu8r0kgrg0.jpg	detail
56	115	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758637292/products/images/k2m4oqn5fwosdgyrsx1f.webp	detail
58	118	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710639/products/images/eebriugmfgkwwjtcupxz.jpg	slide
59	118	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710640/products/images/v6zokrhisyndmlmmg6nl.webp	slide
60	118	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710640/products/images/pvt1lhfudniumkldrokl.jpg	slide
61	118	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710641/products/images/qwnkdw8azssgs44deofe.jpg	detail
62	118	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758710641/products/images/bqsgfun5tymxtoazuxt0.jpg	detail
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, "productId", "authorName", "avatarUrl", "imageUrl", rating, comment, day) FROM stdin;
7	118	Nguyễn Hà Thu	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758809733/reviews/avatars/tfnh7hec3ymspphihlf0.jpg	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759223991/reviews/images/afmylwlcjyd7b8f1dvu5.png	5	Mình mua cho bố dùng một thời gian, ông nói là rất thích, sử dụng đơn giản mà mình thấy ngoại hình cũng đẹp, độc lạ	2
8	118	Hoàng Quỳnh Mai	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759224245/reviews/avatars/m2hpvmfyum0qh3gvipbw.png	https://res.cloudinary.com/dpap9qy7k/image/upload/v1759224247/reviews/images/vi9tzpdne4a3rxxfbig6.png	4	Đã nhận hàng. Sản Phẩm đúng như quảng cáo. Rất đẹp, điều khiển mượt mà	1
\.


--
-- Data for Name: ReviewReply; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReviewReply" (id, "reviewId", comment, day, role) FROM stdin;
14	7	Cảm ơn anh/ chị Nguyễn Hà Thu đã tin tưởng sử dụng sản phẩm bên em ạ\n	2	admin
15	7	Mình và gia đình rất thích những sản phẩm chất lượng như vậy	2	author
16	8	Cảm ơn anh/ chị Hoàng Quỳnh Mai đã tin tưởng đặt hàng ạ	1	admin
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, username, "passwordHash", role, "createdAt", "updatedAt", avatar, "displayName") FROM stdin;
1	admin123	$2b$10$xA/4ZdAEINvsgMGcK0Kgeup6OUJXks61ZOlcoL855d1ZHZzEH.FvG	admin	2025-09-20 02:53:51.366	2025-09-30 09:04:45.633	https://res.cloudinary.com/dpap9qy7k/image/upload/v1758769503/avatars/bvkbepdw5k8f4r2re3uy.png	Mimaki Việt Nam
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b2744d09-709b-404e-827f-20029c0bf9e4	6fb19ee11649a6003e88e72a1d9019cf2f11b042a91d10ff05a426115207cfd9	2025-09-20 09:08:59.422274+07	20250920020859_init	\N	\N	2025-09-20 09:08:59.341514+07	1
02a16ed6-7298-4e4d-a910-ddb031f376ee	c270fd03f42a45378d131ab553f5b7d1f99caab754a03ad1e705b218cd8ce4b9	2025-09-23 17:15:50.138107+07	20250923101550_remove_quantitylabel_add_purchase_options	\N	\N	2025-09-23 17:15:50.103106+07	1
cd4bf6f8-1322-48de-885d-e49b1465a370	7122d0f2654143e6cadcd9353d176fed0ddcf353dcf1610d097abe884e73b293	2025-09-26 10:53:47.486275+07	20250926035347_add_url_unique	\N	\N	2025-09-26 10:53:47.450552+07	1
1942dc0c-8e8c-4ad2-a1c1-cbeb7612723e	0c3f3f00debe56f7e04dec2cdf96ff35cdf667a75b96809827a74707d06eb8ce	2025-09-24 10:24:40.829173+07	20250924032440_product_features_json	\N	\N	2025-09-24 10:24:40.81743+07	1
a2c9f744-9d9e-4430-b13c-832d496951e2	cdb43b1b97792a4d447ec87a8db5e5e701ea700b4f9f2fdaf688d374d9b199fb	2025-09-24 19:34:52.587398+07	20250924123452_add_viewcount_to_product	\N	\N	2025-09-24 19:34:52.570782+07	1
ba19e9e5-8b42-4494-aad2-36b4d482aea4	37dfbcd2452b08929ffb72c342e0723fa9cb43410b7ccb471c001dae1c39e9d3	2025-09-25 10:01:43.335643+07	20250925030143_add_user_avatar_displayname	\N	\N	2025-09-25 10:01:43.329415+07	1
660da0d4-26a1-4891-874c-3b697870725e	8424561b13e9d5d31ab374e61e0d0a7bbc9b67ce6c65b3f5bf6f061ebe54d3ab	2025-09-27 15:53:26.66085+07	20250927085326_add_seo_title	\N	\N	2025-09-27 15:53:26.645893+07	1
d084d34d-10cc-48b2-8231-87657862eb97	40206e5f675593fbc75e5baf52f4fb5c16fc0324fda2898451b89101befd9697	2025-09-25 16:09:37.447518+07	20250925090937_delete_author_avatar_reply	\N	\N	2025-09-25 16:09:37.442057+07	1
02766a82-3003-4618-955a-816849fe27bb	aabf38439cdd0e728d885b2c2367c479c85e1b08dc4907850595ef2a6cf5abb8	2025-09-25 18:12:28.509673+07	20250925111228_add_author_name_avatar_url_review_reply	\N	\N	2025-09-25 18:12:28.503741+07	1
1800600e-6b4b-4cbc-8821-ab75b9750edb	f43dad3fd84ba4af2051ae470981608b3107462fffe9eb2f8ba907d6fd7cdea2	2025-09-25 19:39:47.453982+07	20250925123947_avatar_url_optional_reply	\N	\N	2025-09-25 19:39:47.449968+07	1
b14ed262-9625-4100-bf5f-0ffd7854d3cf	734fff692bccd395278fcb416def294dee111cc6d24fd295b1bd1051eb6a3c94	2025-09-28 20:15:04.034432+07	20250928131504_add_image_product	\N	\N	2025-09-28 20:15:04.024851+07	1
1c2c0744-2ce5-4db3-967e-594f65a77ef4	72db5565d3b55629fcb880fc9c886d3a38e45ba9886ebb17dbb376d17739f643	2025-09-25 20:01:34.287349+07	20250925130134_add_on_delete_cascade_reply	\N	\N	2025-09-25 20:01:34.27443+07	1
b3a74a3a-a32d-4ec4-8167-717a442adc67	fc9998f8619847a68d548f5d75bd478039f01288a9a5f0e7c8e563cedad071b2	2025-09-25 20:09:30.334409+07	20250925130930_add_day_reply	\N	\N	2025-09-25 20:09:30.3176+07	1
348aa721-4ef4-48f5-8ff5-0436988fdfd8	320dba83bfa1b6dfbaa84a24cd1376806275654d3b0b2f8135d3962f79814ef5	2025-09-25 20:14:20.311956+07	20250925131420_add_day_review	\N	\N	2025-09-25 20:14:20.306245+07	1
c7c322d1-fd5e-4663-8d1d-9b5dcfd6b879	d5cbe4471a0f1e999ada2e4ac792c27b0787d0595ad6e02501a3257106238d20	2025-09-29 19:50:00.702276+07	20250929125000_add_purchase_option_order	\N	\N	2025-09-29 19:50:00.693136+07	1
37006c9d-3749-4cf7-97a8-a45b2fdd313b	101eee528ba13406316654f4d2b36d815a0114ea4f744976f500e599d877a2e2	2025-09-25 20:31:30.663785+07	20250925133130_add_role_reply	\N	\N	2025-09-25 20:31:30.615222+07	1
05c05998-8fb2-405e-b283-12475dfede67	40206e5f675593fbc75e5baf52f4fb5c16fc0324fda2898451b89101befd9697	2025-09-26 10:14:56.016067+07	20250926031455_remove_author_reply	\N	\N	2025-09-26 10:14:56.009969+07	1
de1098f6-18f6-40ec-a42e-86cd00a93778	79ea372730122db4927b50385c1a37bc3a1af58cf9bf3e50cbc1a7c93e6bfb44	2025-09-30 09:26:01.835167+07	20250930022601_drop_cate_product	\N	\N	2025-09-30 09:26:01.823167+07	1
a2f90e96-7bce-4c93-91cd-7e451da9e194	8f32002d34ba512b2ff81ae1f95e86d066ac0ee438f5633cb83db80aa9d3e27c	2025-09-30 14:50:14.641795+07	20250930075014_add_review_count	\N	\N	2025-09-30 14:50:14.634003+07	1
1d23a7b0-0700-4dfa-8516-4113607b5563	eab0c5f30fc5056ced56a56d75ce5470082d8ca9e7eee201f5599b8784be859e	2025-10-01 10:32:49.008997+07	20251001033248_rename_viewcount_to_buycount	\N	\N	2025-10-01 10:32:48.995108+07	1
c65ca7fa-8bc5-48b3-89ff-2257cfa6a9d9	adf368667283becefd7c94883bbd47c18d121e6e0abcaa7cff3932478049fa32	2025-10-01 10:39:41.743963+07	20251001033941_	\N	\N	2025-10-01 10:39:41.715491+07	1
\.


--
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 4, true);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Order_id_seq"', 2, true);


--
-- Name: ProductImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ProductImage_id_seq"', 91, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Product_id_seq"', 132, true);


--
-- Name: ReviewReply_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ReviewReply_id_seq"', 16, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Review_id_seq"', 8, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductImage ProductImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: ReviewReply ReviewReply_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReply"
    ADD CONSTRAINT "ReviewReply_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Order_customerId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Order_customerId_key" ON public."Order" USING btree ("customerId");


--
-- Name: Product_urlProduct_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Product_urlProduct_key" ON public."Product" USING btree ("urlProduct");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Order Order_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProductImage ProductImage_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReviewReply ReviewReply_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReply"
    ADD CONSTRAINT "ReviewReply_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES public."Review"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict D2Ng1vy98lTHUcNNvmSeeBQGmtmMV4hnLd9SybsxlcsmrgVdr4OUUDyq81pbThP

