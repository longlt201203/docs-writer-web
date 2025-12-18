import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          navigate({ to: "/auth/login" });
        }}
      >
        Login
      </Button>

      <Button
        onClick={() => {
          navigate({ to: "/yoopta-editor" });
        }}
      >
        Yoopta Editor
      </Button>
    </div>
  );
}
