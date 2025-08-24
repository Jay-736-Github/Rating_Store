import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { submitRating } from "@/api/store.api";

function RatingModal({ store, isOpen, onClose, onRatingSuccess }) {
  const [rating, setRating] = useState(store.userRating || 0);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating from 1 to 5.");
      return;
    }
    setError(null);

    try {
      await submitRating(store.id, rating);
      onRatingSuccess(); 
      onClose();
    } catch (err) {
      setError(err.message || "Failed to submit rating.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate: {store.name}</DialogTitle>
          <DialogDescription>
            Select a star rating from 1 to 5. Your rating can be updated later.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: star <= rating ? "#f59e0b" : "#a1a1aa",
              }}
            >
              ★
            </span>
          ))}
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Rating</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RatingModal;
