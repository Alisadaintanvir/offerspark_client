import React from "react";
import { FileX2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  message = "The content you are looking for was not found.",
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <FileX2 size={64} className="text-red-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Content Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">{message}</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
