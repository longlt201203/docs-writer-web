import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookText,
  PenLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-20%] h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-xs">
              <Sparkles className="size-4" />
              Smarter documentation
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Write clear docs, faster.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Start with an AI-friendly editor, keep your team aligned, and
                publish polished documentation in minutes—not hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate({ to: "/yoopta-editor" })}
                className="shadow-md shadow-primary/25"
              >
                Open editor
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/auth/login" })}
              >
                Sign in to workspace
              </Button>
              <p className="text-sm text-muted-foreground">
                No setup required. Just start typing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Structured clarity",
                  description: "Guided sections keep every doc consistent.",
                  Icon: BookText,
                },
                {
                  title: "Polished drafts",
                  description: "Inline formatting and quick prompts speed up edits.",
                  Icon: PenLine,
                },
                {
                  title: "Safe by default",
                  description: "Permissions ready before you hit publish.",
                  Icon: ShieldCheck,
                },
                {
                  title: "AI friendly",
                  description: "Optimized for collaborative writing with your team.",
                  Icon: Sparkles,
                },
              ].map(({ title, description, Icon }) => (
                <div
                  key={title}
                  className="group rounded-xl border bg-card/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-lg bg-primary/15 p-2 text-primary shadow-xs ring-1 ring-primary/10 transition group-hover:bg-primary/20">
                      <Icon className="size-4" />
                    </span>
                    <div className="space-y-1.5">
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-primary/20 bg-card/80 backdrop-blur">
            <CardHeader className="gap-3 border-b border-border/60 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/10">
                  <PenLine className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Quick start</CardTitle>
                  <CardDescription>
                    Jump into a new doc or continue where you left off.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="space-y-3 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  Blank document
                </p>
                <p className="text-sm text-muted-foreground">
                  Spin up a fresh canvas with headings, callouts, and rich media
                  blocks ready to go.
                </p>
                <Button
                  size="sm"
                  className="self-start"
                  onClick={() => navigate({ to: "/yoopta-editor" })}
                >
                  Start writing
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Common flows
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: "Sign in & sync",
                      description: "Access saved drafts and team spaces.",
                      action: () => navigate({ to: "/auth/login" }),
                      cta: "Go to login",
                    },
                    {
                      title: "Explore editor",
                      description: "Test embeds, tables, and AI-assisted blocks.",
                      action: () => navigate({ to: "/yoopta-editor" }),
                      cta: "Open editor",
                    },
                  ].map(({ title, description, action, cta }) => (
                    <div
                      key={title}
                      className="rounded-lg border bg-muted/30 p-3 shadow-xs"
                    >
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 px-2 text-primary"
                        onClick={action}
                      >
                        {cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
