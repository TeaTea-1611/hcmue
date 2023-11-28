"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="font-black !text-transparent text-9xl bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-sky-500">
        404
      </h1>
      <h2 className="mt-2 text-xl font-bold">😓 Không tìm thấy nội dung</h2>
      <p className="mt-4 font-medium">
        URL này đã bị thay đổi hoặc không còn tồn tại.
      </p>
      <div className="flex mt-4 space-x-4">
        <button
          className="w-44 py-1.5 text-white bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-3xl font-bold"
          onClick={() => router.back()}
        >
          Quay lại
        </button>
        <button
          className="w-44 py-1.5 text-white bg-gradient-to-r from-blue-500 to-sky-500 rounded-3xl font-bold"
          onClick={() => router.replace("/")}
        >
          Trang chủ
        </button>
      </div>
    </div>
  );
};

export default Page;
