import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold text-blue-600">💳 CrediFlow</div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
          Welcome to CrediFlow
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
          A modern, microservices-based loan management system
        </p>
        <div className="mt-8">
          <Link to="/register">
            <Button className="px-8 py-3 text-lg">Create Account</Button>
          </Link>
        </div>
        </div>
      </main>
    </div>
  );
};