// src/ErrorPage.jsx
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-green-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
