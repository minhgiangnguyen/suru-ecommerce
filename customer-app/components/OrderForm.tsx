import React, { useEffect, useState } from "react";
import { Product } from "../pages/[urlProduct]";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

type OrderFormProps = {
  product: Product;
};

// Định nghĩa Validation Schema với Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập Họ và tên"),
  detailAddress: Yup.string().required("Vui lòng nhập Địa chỉ"),
  province: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
  district: Yup.string().required("Vui lòng chọn Quận/Huyện"),
  ward: Yup.string().required("Vui lòng chọn Phường/Xã"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .required("Vui lòng nhập Số điện thoại"),
    purchaseOption: Yup.object({
      totalPrice: Yup.number()
        .min(1, "Vui lòng chọn phân loại")
        .required("Vui lòng chọn phân loại"),
    }),
});

// Định nghĩa Initial Values
const getInitialValues = (product: Product) => ({
  fullName: "",
  detailAddress: "",
  province: "",
  district: "",
  ward: "",
  phone: "",
  purchaseOption: {
    totalPrice: 0,
    option: "",
  },
  address: "",
});

export const OrderForm: React.FC<OrderFormProps> = ({ product }) => {
  const initialValues = getInitialValues(product);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  const handleProvinceChange = (provinceCode: string, setFieldValue: any) => {
    setFieldValue("province", provinceCode);
    setFieldValue("district", "");
    setFieldValue("ward", "");
    setDistricts([]);
    setWards([]);

    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((res) => setDistricts(res.data.districts));
    }
  };

  const handleDistrictChange = (districtCode: string, setFieldValue: any) => {
    setFieldValue("district", districtCode);
    setFieldValue("ward", "");
    setWards([]);

    if (districtCode) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((res) => setWards(res.data.wards));
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const provinceName =
      provinces.find((p) => p.code == values.province)?.name || "";
    const districtName =
      districts.find((d) => d.code == values.district)?.name || "";
    const wardName = wards.find((w) => w.code == values.ward)?.name || "";

    const address = `${values.detailAddress}-${wardName}-${districtName}-${provinceName}`;

    // Tìm option được chọn
    const selectedOption = product.purchaseOptions.find(
      (o) => o.totalPrice === Number(values.purchaseOption)
    )!;

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          phone: values.phone,
          address,
          productId: product.id,
          purchaseOption: selectedOption.option,
          totalPrice: selectedOption.totalPrice,
        }),
      });

      if (!res.ok) {
        throw new Error("Đặt hàng thất bại!");
      }

      const data = await res.json();
      console.log("Đặt hàng thành công:", data);
      alert("Đặt hàng thành công!");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi đặt hàng!");
    }
  };

  // Lấy dữ liệu features
  const features = product.features.items;
  const note = product.features.note;
  const salePrice = product.salePercent
    ? product.price * (1 - product.salePercent / 100)
    : product.price;

  return (
    <div className="w-full flex justify-center items-center min-h-screen ">
      <div
        className="  shadow-2xl text-white font-sans"
        style={{
          // Sử dụng formImage làm ảnh nền
          backgroundImage: `url(${product.formImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Thêm lớp phủ (overlay) nhẹ để text dễ đọc hơn
          position: "relative",
          zIndex: 0, // Đảm bảo lớp phủ nằm dưới nội dung
        }}
      >
        {/* Lớp phủ (Overlay) làm tối nền để text dễ đọc */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg -z-1"></div>

        {/* Tên sản phẩm */}
        <h3 className="text-center text-2xl font-black mb-4  pt-1 text-yellow-300 ">
          {product.name}
        </h3>

        {/* Đặc điểm/Tính năng */}
        <div className="bg-black py-3 px-4 mb-4 rounded-md w-10/12 mx-auto">
          <h3 className="text-center text-3xl font-bold uppercase text-yellow-300 mb-2 pb-3 pt-4 border-b border-white">
            {product.features.title}
          </h3>
          <ul className="list-disc pl-5 text-yellow-300 my-4">
            {features.map((item, idx) => (
              <li key={idx} className="mb-1 text-lg font-medium leading-tight	 ">
                {item}
              </li>
            ))}
          </ul>
          {/* Dòng chữ đỏ (Note) */}
          {note && (
            <p className="text-red-600 text-center font-bold text-base pb-2">
              {note}
            </p>
          )}
          {/* Nhanh tay lên */}
          <h4 className="text-center font-extrabold text-3xl mb-1 pt-4 border-t-2">
            NHANH TAY LÊN!
          </h4>
        </div>
        {/* ---------------------------------------------------------------------------- */}
        {/* FORM ORDER */}
        <div className="bg-stone-400/30 py-3 px-4 mb-4 rounded-3xl w-11/12 mx-auto">
          {/* Các ô thông tin chính sách */}
          <div className="flex justify-between my-4 text-center text-xs gap-1">
            {/* Giá */}
            <div className="font-semibold text-sm leading-snug  text-nowrap w-28 h-24 border-3 border-dashed border-orange-400 rounded-3xl flex flex-col justify-center items-center py-4 px-2">
              <div className="text-center">
                {product.salePercent > 0 ? "Giảm tới" : "Giá bán"} <br />
                {product.salePercent > 0 ? (
                  <span className=" font-extrabold">
                    {product.salePercent}% GIÁ
                  </span>
                ) : (
                  "ưu đãi:"
                )}
              </div>

              <div className="">
                Chỉ:{" "}
                <span className="text-yellow-300 font-extrabold">
                  {product.salePercent
                    ? salePrice.toLocaleString("vi-VN")
                    : product.price.toLocaleString("vi-VN")}
                  đ
                </span>
              </div>
            </div>
            {/* Vận chuyển */}
            <div className="font-semibold text-sm leading-snug text-nowrap w-28 h-22 border-3 border-dashed border-orange-400 rounded-3xl flex flex-col justify-center items-center py-4 px-2">
              <div>
                Miễn phí <br />{" "}
                <span className=" font-extrabold">VẬN CHUYỂN</span>
              </div>
              Tận nhà
            </div>
            {/* Bảo hành */}
            <div className="text-sm leading-tight text-nowrap w-28 h-22 border-3 border-dashed border-orange-400 rounded-3xl flex flex-col justify-center items-center py-4 px-2">
              <div className="font-semibold ">
                Bảo hành <br /> <span className="font-extrabold">1 ĐỔI 1</span>
              </div>
              <div className=" font-semibold ">
                Trong{" "}
                <span className=" font-extrabold text-yellow-300">15</span> ngày
              </div>
            </div>
          </div>

          {/* Dòng chữ hoàn tiền */}
          <div className="text-center text-sm font-medium mb-3  py-1 rounded text-nowrap">
            Hoàn tiền 100 lần nếu phát hiện hàng giả hàng nhái
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}   // ❌ không validate khi blur
            validateOnChange={false} // ❌ không validate khi change
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-3">
                {/* Input Họ và tên */}
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Họ và tên"
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.fullName && touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-sm text-red-400 mt-1"
                  />
                </div>

                {/* Input Số điện thoại */}
                <div>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="Nhập Số điện thoại"
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.phone && touched.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red-400 mt-1"
                  />
                </div>

                {/* Tỉnh/Thành */}
                <div>
                  <Field
                    as="select"
                    name="province"
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.province && touched.province
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleProvinceChange(e.target.value, setFieldValue)
                    }
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="province"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Quận/Huyện */}
                <div>
                  <Field
                    as="select"
                    name="district"
                    disabled={!districts.length}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleDistrictChange(e.target.value, setFieldValue)
                    }
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.district && touched.district
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="district"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Phường/Xã */}
                <div>
                  <Field
                    as="select"
                    name="ward"
                    disabled={!wards.length}
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.ward && touched.ward
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("ward", e.target.value)
                    }
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="ward"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* Địa chỉ chi tiết */}
                <div>
                  <Field
                    name="detailAddress"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.detailAddress && touched.detailAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="detailAddress"
                    component="div"
                    className="text-sm text-red-400 mt-1"
                  />
                </div>
                {/* Select Số lượng */}
                <div>
                  <Field
                    name="purchaseOption.totalPrice"
                    as="select"
                    className={`w-full p-3 rounded text-black bg-white border-2 ${
                      errors.purchaseOption?.totalPrice &&
                      touched.purchaseOption?.totalPrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="0" disabled>
                      Chọn phân loại
                    </option>
                    {product.purchaseOptions.map((opt, idx) => (
                      <option key={idx} value={opt.totalPrice}>
                        {opt.option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="purchaseOption.totalPrice"
                    component="div"
                    className="text-sm text-red-400 mt-1"
                  />
                </div>

                {/* Button Submit */}
                <button
                  type="submit"
                  className="w-full animate-shake animate-infinite animate-duration-300 animate-ease-in-out bg-red-600 hover:bg-red-700 text-white p-3 font-extrabold uppercase rounded-lg shadow-lg"
                >
                  MUA NGAY | MIỄN PHÍ GIAO HÀNG
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {/* ---------------------------------------------------------------------------- */}

        {/* Footer note */}
        <div className="text-center text-xl mb-3 font-semibold">
          Lưu ý: Sản phẩm chính hãng được kiểm tra
          <br />
          hàng trước khi thanh toán.
        </div>
      </div>
    </div>
  );
};
