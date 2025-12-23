import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarFooter } from "../ui/sidebar";

export default function DocsWriterSidebarFooter() {
    return (
        <SidebarFooter>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='py-2 flex items-center gap-2 shadow hover:bg-accent/50 px-2 py-1 rounded-md cursor-pointer'>
                        <Avatar>
                            <AvatarImage src='' />
                            <AvatarFallback>LT</AvatarFallback>
                        </Avatar>
                        <p>Le Thanh Long</p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className='text-destructive'>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    );
}