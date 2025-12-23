import { Sidebar, SidebarSeparator } from "../ui/sidebar";
import DocsWriterSidebarContent from "./DocsWriterSidebarContent";
import DocsWriterSidebarHeader from "./DocsWriterSidebarHeader";
import DocsWriterSidebarFooter from "./DocsWriterSidebarFooter";

export default function DocsWriterSidebar() {
    return (
        <Sidebar variant="inset">
            <DocsWriterSidebarHeader />
            <SidebarSeparator />
            <DocsWriterSidebarContent />
            <DocsWriterSidebarFooter />
        </Sidebar>
    )
}