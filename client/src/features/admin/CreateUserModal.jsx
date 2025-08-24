import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminCreateUser } from "@/api/admin.api";


function CreateUserModal({ isOpen, onClose, onSuccess, defaultRole = "USER" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: defaultRole,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
        role: defaultRole,
      });
      setError(null);
    }
  }, [isOpen, defaultRole]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await adminCreateUser(formData);
      onSuccess(); 
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create user.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create New{" "}
            {defaultRole.charAt(0) + defaultRole.slice(1).toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder="Full Name (20-60 chars)"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit">Create Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserModal;
