import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarHeader } from "../ui/sidebar";
import { useState } from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

export default function DocsWriterSidebarHeader() {
    const [folder, setFolder] = useState<any>();
    const form = useForm();

    return (
        <SidebarHeader>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-medium'>Docs Writer</h2>
                <Dialog>

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
                        <DialogHeader>{folder ? "Edit Folder" : "Create Folder"}</DialogHeader>
                        <div>

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </SidebarHeader>
    )
}