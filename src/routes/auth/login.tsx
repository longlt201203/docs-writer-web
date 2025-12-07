import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { GoogleLogin } from '@react-oauth/google';
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

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const loginSchema = z.object({
  usernameOrEmail: z
    .string(),
  password: z.string(),
})

type LoginFormValues = z.infer<typeof loginSchema>;

const mockAccount = {
  usernameOrEmail: 'user',
  password: '123',
}

function RouteComponent() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (
        data.usernameOrEmail !== mockAccount.usernameOrEmail ||
        data.password !== mockAccount.password
      ) {
        throw new Error('Invalid username/email or password');
      }
      return "OK";
    }
  })

  const isSubmitting = loginMutation.isPending;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        {loginMutation.isError ? (
          <p className="text-sm text-destructive">
            {(loginMutation.error as Error)?.message ?? 'Unable to sign in'}
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
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
