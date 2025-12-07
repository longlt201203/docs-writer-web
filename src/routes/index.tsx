import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate();
  
  return <div>
    <Button onClick={() => {
      navigate({ to: '/auth/login' })
    }}>Login</Button>
  </div>
}
