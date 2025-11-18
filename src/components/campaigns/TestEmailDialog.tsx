"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { Input } from "@/components/ui";
import { LoadingSpinner } from "@/components/ui";

interface TestEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
  isSending: boolean;
  error?: string | null;
  isSuccess?: boolean;
}

export function TestEmailDialog({
  isOpen,
  onClose,
  onSend,
  isSending,
  error,
  isSuccess,
}: TestEmailDialogProps) {
  const [testEmail, setTestEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testEmail) {
      onSend(testEmail);
    }
  };

  const handleClose = () => {
    setTestEmail("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      title="Send Test Email"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div>
            <label
              htmlFor="testEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <Input
              type="email"
              id="testEmail"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="mt-1"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {isSuccess && (
            <p className="text-sm text-green-600" role="status">
              Test email sent successfully!
            </p>
          )}
        </DialogContent>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleClose}
            disabled={isSending}
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSending}
            variant="primary"
            className="inline-flex items-center gap-2"
          >
            {isSending ? (
              <>
                <LoadingSpinner size="sm" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Send Test
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
