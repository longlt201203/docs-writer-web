import { ChevronDownIcon, EllipsisIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function DocsWriterSidebarContent() {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Collapsible key={index} className="group/collapsible w-full">
                                <div className="flex w-full items-center">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuItem className="grow">
                                            <SidebarMenuButton>Folder {index + 1}<ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" /></SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </CollapsibleTrigger>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost"><EllipsisIcon /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {Array.from({ length: 5 }).map((_, subIndex) => (
                                            <SidebarMenuSubItem key={subIndex}>
                                                <SidebarMenuButton>Document {subIndex + 1}</SidebarMenuButton>
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
    )
}