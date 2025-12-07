import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

const tabs = [
  {
    title: 'Login',
    to: '/auth/login',
  },
  {
    title: 'Register',
    to: '/auth/register',
  },
]

function RouteComponent() {
  const location = useLocation();
  const navigate = Route.useNavigate();

  return <div className='h-screen flex flex-col justify-center items-center'>
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Tabs value={location.pathname} onValueChange={(v) => navigate({ to: v })}>
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger key={index} value={tab.to}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Outlet />
    </div>
  </div>
}
