import React from "react";
interface DescriptionProps {
  description: string;
}
export default function Description({ description }: DescriptionProps) {
  return (
    <div className="text-center border-b border-gray-600">
      <h3 className="underline font-bold underline-offset-4 ">
        MÔ TẢ SẢN PHẨM
      </h3>
      <div dangerouslySetInnerHTML={{ __html: description }} className="mt-2" />
    </div>
  );
}
