import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/api/auth.api";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-md bg-gray-50 text-gray-900"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-md bg-gray-50 text-gray-900"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors"
      >
        Login
      </Button>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </form>
  );
}

export default LoginForm;
