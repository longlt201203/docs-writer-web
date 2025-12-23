import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarHeader } from "../ui/sidebar";
import { useState } from "react";
import FolderForm, { FolderFormFields } from "../forms/FolderForm";

export default function DocsWriterSidebarHeader() {
    const [folderDialogOpen, setFolderDialogOpen] = useState(false);

    return (
        <SidebarHeader>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-medium'>Docs Writer</h2>
                <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost"><MenuIcon /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    Create Folder
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem>
                                Create Document
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent>
                        <FolderForm onSubmit={(values) => {
                            console.log(values);
                            setFolderDialogOpen(false);
                        }}>
                            <div className="flex flex-col gap-y-4">
                                <DialogTitle>Create Folder</DialogTitle>
                                <FolderFormFields />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </div>
                        </FolderForm>
                    </DialogContent>
                </Dialog>
            </div>
        </SidebarHeader>
    )
}