import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
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
import { authApi } from '@/lib/apis/auth/auth.api'
import type {
  AuthResponse,
  GoogleLoginRequest,
  LoginRequest,
} from '@/lib/apis/auth/auth.dto'
import type { BaseResponse } from '@/lib/apis/dto'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const LOGIN_ERROR_MESSAGE = 'Unable to sign in'
const GOOGLE_ERROR_MESSAGE = 'Unable to sign in with Google'

function RouteComponent() {
  const form = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      pass: '',
    },
  });

  const navigate = Route.useNavigate()

  const loginMutation = useMutation<
    BaseResponse<AuthResponse>,
    Error,
    LoginRequest
  >({
    mutationFn: async (values: LoginRequest) => {
      const response = await authApi.login(values)

      if (!response.success) {
        throw new Error(response.message ?? LOGIN_ERROR_MESSAGE)
      }

      return response
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const googleLoginMutation = useMutation<
    BaseResponse<AuthResponse>,
    Error,
    string
  >({
    mutationFn: async (idToken: string) => {
      const payload: GoogleLoginRequest = { idToken }
      const response = await authApi.googleLogin(payload)

      if (!response.success) {
        throw new Error(response.message ?? GOOGLE_ERROR_MESSAGE)
      }

      return response
    },
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const isSubmitting = loginMutation.isPending || googleLoginMutation.isPending;
  const authError = loginMutation.error ?? googleLoginMutation.error

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
                name="username"
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
                name="pass"
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
