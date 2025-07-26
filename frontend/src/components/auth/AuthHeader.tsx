import { Link } from "react-router-dom";
import { ArrowLeft, ChefHat } from "lucide-react";

interface AuthHeaderProps {
  mode: "login" | "register";
}

export function AuthHeader({ mode }: AuthHeaderProps) {
  return (
    <div className="w-full max-w-md text-center mb-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="animate-fade-up">
        {/* Thematic Logo and Brand Name */}
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 rounded-xl shadow-md">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-3xl tracking-tight text-gray-800">
            FreshConnect
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
          {mode === "login" ? "Welcome Back!" : "Join the Network"}
        </h1>

        {/* Sub-headlines */}
        <p className="text-muted-foreground">
          {mode === "login"
            ? "Sign in to manage your orders and suppliers."
            : "The #1 marketplace for street food vendors and suppliers."
          }
        </p>
      </div>
    </div>
  );
}