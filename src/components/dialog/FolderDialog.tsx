import { useEffect, type PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const folderSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Folder name is required"),
});

export type FolderFormValues = z.infer<typeof folderSchema>;

export interface FolderDialogProps extends PropsWithChildren {
  open?: boolean;
  folder?: FolderFormValues;
  onSubmit?: (values: FolderFormValues) => void;
  loading?: boolean;
  onClose?: () => void;
}

export default function FolderDialog({
  open,
  onSubmit,
  folder,
  loading,
  onClose,
}: FolderDialogProps) {
  const form = useForm<FolderFormValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(folderSchema),
  });

  useEffect(() => {
    if (open && folder) {
      form.reset(folder);
    }
  }, [open, folder, form]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{folder ? "Edit Folder" : "New Folder"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              if (onSubmit) {
                onSubmit(values);
              }
            })}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder Name</FormLabel>
                    <Input placeholder="Enter folder name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
