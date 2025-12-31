import { ChevronDownIcon, EllipsisIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { FolderFormValues } from "../dialog/FolderDialog";
import FolderDialog from "../dialog/FolderDialog";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useNavigate } from "@tanstack/react-router";

const mockFolders: FolderFormValues[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    id: index + 1,
    name: `Folder ${index + 1}`,
  })
);

export default function DocsWriterSidebarContent() {
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [folder, setFolder] = useState<FolderFormValues>();
  const [confirmDeleteFolderOpen, setConfirmDeleteFolderOpen] = useState(false);
  const [deleteFolderId, setDeleteFolderId] = useState<number>();
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
  const deleteFolderMutation = useMutation({
    mutationFn: async (folderId: number) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Folder deleted:", folderId);
    },
    onSettled: () => {
      setConfirmDeleteFolderOpen(false);
    },
  });

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockFolders.map((folder) => (
                <Collapsible
                  key={folder.id}
                  className="group/collapsible w-full"
                >
                  <div className="flex w-full items-center">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuItem className="grow">
                        <SidebarMenuButton>
                          {folder.name}
                          <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </CollapsibleTrigger>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <EllipsisIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setFolder(folder);
                            setFolderDialogOpen(true);
                          }}
                        >
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setDeleteFolderId(folder.id);
                            setConfirmDeleteFolderOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {Array.from({ length: 5 }).map((_, subIndex) => (
                        <SidebarMenuSubItem
                          key={subIndex}
                          onClick={() =>
                            navigate({
                              to: "/user/document",
                              search: { id: subIndex + 1 },
                            })
                          }
                        >
                          <SidebarMenuButton>
                            Document {subIndex + 1}
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <FolderDialog
        open={folderDialogOpen}
        onSubmit={(values) => {
          folderMutation.mutate(values);
        }}
        loading={folderMutation.isPending}
        folder={folder}
        onClose={() => setFolderDialogOpen(false)}
      />

      <ConfirmDialog
        open={confirmDeleteFolderOpen}
        loading={deleteFolderMutation.isPending}
        title="Delete Folder"
        description="Are you sure you want to delete this folder? This action cannot be undone."
        onCancel={() => setConfirmDeleteFolderOpen(false)}
        onConfirm={() => {
          if (deleteFolderId != undefined) {
            deleteFolderMutation.mutate(deleteFolderId);
          }
        }}
        variant="destructive"
        confirmText={deleteFolderMutation.isPending ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </>
  );
}
