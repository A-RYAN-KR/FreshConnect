import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/GradientButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // For loading spinner
import { login } from "@/services/authService";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await login(formData);
      // Assuming the token is stored in your auth service or here
      // localStorage.setItem('token', data.token); 
      navigate('/marketplace');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Card with a softer shadow, animation, and defined width
    <Card className="w-full max-w-md animate-fade-up shadow-lg border-none">
      <CardContent className="p-8">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-semibold">Password</Label>
              <Link to="/auth/forgot-password" className="text-sm font-medium text-orange-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-12"
            />
          </div>

          {errorMessage && <p className="text-red-600 text-sm font-medium text-center">{errorMessage}</p>}

          <GradientButton type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Log In'}
          </GradientButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6 bg-amber-50/50 border-t">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-semibold text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}