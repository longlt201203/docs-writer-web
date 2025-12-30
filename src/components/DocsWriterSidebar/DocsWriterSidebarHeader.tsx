import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarHeader } from "../ui/sidebar";
import { useState } from "react";
import FolderDialog, { type FolderFormValues } from "../dialog/FolderDialog";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export default function DocsWriterSidebarHeader() {
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const navigate = useNavigate();

  const folderMutation = useMutation({
    mutationFn: async (values: FolderFormValues) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Folder created:", values);
    },
    onSettled: () => {
      setFolderDialogOpen(false);
    },
  });

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Docs Writer</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFolderDialogOpen(true)}>
                Create Folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({ to: "/user/document", search: { id: undefined } })
                }
              >
                Create Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <FolderDialog
        open={folderDialogOpen}
        onSubmit={(values) => {
          folderMutation.mutate(values);
        }}
        loading={folderMutation.isPending}
        onClose={() => setFolderDialogOpen(false)}
      />
    </>
  );
}
