import DocsWriterSidebar from '@/components/DocsWriterSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/user')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <SidebarProvider>
            <DocsWriterSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
