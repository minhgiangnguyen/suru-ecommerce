import { useEffect, useState } from "react";

export function useImageUpload(
  initial?: string | string[] | null,
  multiple = false
) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onChange = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    if (multiple) {
      setFiles(arr);
      setPreviews(arr.map((f) => URL.createObjectURL(f)));
    } else {
      setFiles([arr[0]]);
      setPreviews([URL.createObjectURL(arr[0])]);
    }
  };
  const remove = (idx?: number) => {
    if (multiple) {
      setFiles((prev) => prev.filter((_, i) => i !== idx));
      setPreviews((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setFiles([]);
      setPreviews([]);
    }
  };
  // ✅ thêm reset để clear sau khi submit xong
  const reset = () => {
    setFiles([]);
    setPreviews([]);
  };
  return { files, previews, onChange, remove,reset };
}
