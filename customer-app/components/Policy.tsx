type PolicyProps = {};

export const Policy = ({}: PolicyProps) => {
  return (
    <div className="h-56 bg-black text-white py-4 pl-10 ">
      <h3 className="font-bold text-xl mb-2">HỖ TRỢ KHÁCH HÀNG</h3>
      <ul className="space-y-2 text-base leading-8">
        <li>Miễn phí giao hàng toàn quốc</li>
        <li>Bảo hành 1 năm từ ngày nhận hàng</li>
        <li>Miễn phí đổi trả trong vòng 15 ngày</li>
        <li>Được quyền kiểm tra trước khi thanh toán</li>
      </ul>
    </div>
  );
};

