import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "@/assets/animation/Lonely 404.json";

const NotFound: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 text-center">
      <div className="w-72 md:w-96">
        <Lottie animationData={notFoundAnimation} loop />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-theme">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-secondary max-w-md">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
    </div>
  );
};

export default NotFound;
