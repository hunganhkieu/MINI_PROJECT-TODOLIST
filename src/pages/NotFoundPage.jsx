import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Trang không tồn tại</h2>
      <p className="text-gray-500 mt-2 mb-6 text-center px-4">
        Có vẻ như bạn đã đi lạc. Trang bạn tìm kiếm không tồn tại hoặc đã bị
        xóa.
      </p>

      <Link
        to="/todos"
        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
