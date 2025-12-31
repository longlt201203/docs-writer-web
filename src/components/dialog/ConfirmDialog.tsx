import type { VariantProps } from "class-variance-authority";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface ConfirmDialogProps {
  open?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: VariantProps<typeof Button>["variant"];
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  variant,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText || "Cancel"}
          </Button>
          <Button
            variant={variant || "default"}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText || "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
