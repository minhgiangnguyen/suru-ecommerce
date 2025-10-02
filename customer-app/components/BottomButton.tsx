import React from 'react'
import { useScrollTo } from "../hooks/useScrollTo";

type BottomButtonProps = {
    salePercent: number;
  };
export const BottomButton = ({ salePercent }: BottomButtonProps) => {
    const scrollTo = useScrollTo();

  return (
    <div className="flex z-50 bottom-0 fixed w-full text-sm max-w-md mx-auto">
        {/* FREE SHIP + SALE */}
        <button
          onClick={() => scrollTo("order")}
          className="w-1/2 flex flex-col justify-center bg-[#0A2342] px-4 py-4 text-white font-bold rounded-l-lg"
        >
          {salePercent > 0 ? (
            <div className="animate-pulse animate-infinite animate-duration-500">
              <span>{`SALE ${salePercent}% - FREE SHIP`}</span>
              {/* progress bar */}
              <div className="w-full h-2 bg-gray-600 rounded mt-1 relative">
                <div
                  className="h-2 bg-[#F44025] rounded"
                  style={{ width: `${salePercent}%` }}
                />
                {/* nút tròn */}
                <div
                  className="w-4 h-4 bg-[#F44025] rounded-full absolute -top-1"
                  style={{ left: `calc(${salePercent}% - 8px)` }}
                />
              </div>
            </div>
          ) : (
            <span className="animate-pulse animate-infinite animate-duration-500">
              FREE SHIP
            </span>
          )}
        </button>

        {/* MUA NGAY */}
        <button
          onClick={() => scrollTo("order")}
          className="w-1/2 bg-[#F44025] text-white py-2 font-bold 
         animate-jump animate-infinite animate-duration-1000 rounded-r-lg"
        >
          MUA NGAY
        </button>
      </div>
  )
}
