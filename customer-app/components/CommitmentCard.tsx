import { useScrollTo } from "../hooks/useScrollTo";

type CommitmentCardProps = {
  scrollTo: (id: string) => void;
};

export default function CommitmentCard() {
  const scrollTo = useScrollTo();

  return (
    <div className=" shadow-sm  text-center p-4">
      <h3 className="text-2xl font-normal ">Cam kết</h3>
      <p className="text-sm mt-1">
        Sản phẩm chính hãng - được thiết kế và sản xuất bởi
        <br />
        <span className="font-medium">SURU Việt Nam</span>
      </p>

      <button
        onClick={() => scrollTo("order")}
        className="uppercase mt-4 bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow-[0_0_12px_rgba(255,0,0,0.6)] hover:bg-red-700 transition"
      >
        ĐẶT HÀNG NGAY
      </button>
    </div>
  );
}
