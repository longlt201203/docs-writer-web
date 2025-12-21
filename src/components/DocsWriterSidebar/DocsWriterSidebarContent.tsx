import { ChevronDownIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";

export default function DocsWriterSidebarContent() {
    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Collapsible key={index} className='group/collapsible'>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>Folder {index + 1}<ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" /></SidebarMenuButton>
                                    </SidebarMenuItem>
                                </CollapsibleTrigger>
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