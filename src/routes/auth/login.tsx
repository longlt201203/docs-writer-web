import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { GoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const loginSchema = z.object({
  usernameOrEmail: z
    .string(),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>;

function RouteComponent() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const navigate = Route.useNavigate()

  const loginMutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: values.usernameOrEmail?.trim(),
          pass: values.password,
        }),
      })

      const body = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(body?.message ?? 'Unable to sign in')
      }

      return body
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const googleLoginMutation = useMutation({
    mutationFn: async (idToken: string) => {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      })

      const body = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(body?.message ?? 'Unable to sign in with Google')
      }

      return body
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const isSubmitting = loginMutation.isPending || googleLoginMutation.isPending;
  const authError = (loginMutation.error ?? googleLoginMutation.error) as
    | Error
    | undefined

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {authError ? (
          <p className="text-sm text-destructive">
            {authError.message ?? 'Unable to sign in'}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <div className='flex flex-col w-full gap-4'>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
            >
              <FormField
                control={form.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </Button>
              </div>
            </form>
          </Form>

          <Separator />

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const idToken = credentialResponse.credential
              if (!idToken) {
                console.error('Missing Google credential')
                return
              }
              googleLoginMutation.mutate(idToken)
            }}
            onError={() => {
              console.error('Google Login Failed')
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
