import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/api/auth.api";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const data = await signupUser(formData);
      setSuccess(data.message);
    } catch (err) {
      if (err.errors) {
        setError(err.errors.map((e) => e.msg).join(", "));
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name" className="text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-md bg-gray-50 text-gray-900"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-md bg-gray-50 text-gray-900"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address" className="text-gray-700">
          Address
        </Label>
        <Input
          id="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
          className="border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 rounded-md bg-gray-50 text-gray-900"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors"
      >
        Create Account
      </Button>
      {success && (
        <p className="text-sm text-green-500 text-center">{success}</p>
      )}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </form>
  );
}

export default SignupForm;
