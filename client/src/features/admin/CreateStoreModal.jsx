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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminCreateStore } from "@/api/admin.api";
import { getAllUsers } from "@/api/admin.api";

function CreateStoreModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (isOpen) {
      const fetchOwners = async () => {
        try {
          const data = await getAllUsers({ role: "OWNER" });
          setOwners(data.users);
        } catch (err) {
          console.error("Failed to fetch owners", err);
        }
      };
      fetchOwners();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOwnerChange = (value) => {
    setFormData((prev) => ({ ...prev, ownerId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await adminCreateStore({
        ...formData,
        ownerId: parseInt(formData.ownerId, 10),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create store.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Store</DialogTitle>
          <DialogDescription>
            Fill in the details to register a new store.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            id="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            type="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            id="address"
            placeholder="Store Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Select onValueChange={handleOwnerChange}>
            <SelectTrigger>
              <SelectValue placeholder="Assign an Owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.length > 0 ? (
                owners.map((owner) => (
                  <SelectItem key={owner.id} value={String(owner.id)}>
                    {owner.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="null" disabled>
                  No available owners
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit">Create Store</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateStoreModal;
