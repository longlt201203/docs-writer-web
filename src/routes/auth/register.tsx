import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

const registerSchema = z
  .object({
    username: z.string().min(1, 'Please enter a username'),
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    firstName: z.string().min(1, 'Please enter your first name'),
    lastName: z.string().optional(),
    avatar: z
      .url('Please provide a valid URL')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>;

const mockRegister = async (data: RegisterFormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return data
}

const mockUploadAvatar = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const fakeCdnHost = 'https://cdn.example.com/uploads'
  return `${fakeCdnHost}/${encodeURIComponent(file.name)}`
}

function RouteComponent() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      avatar: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: mockRegister,
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: mockUploadAvatar,
    onSuccess: (url) => {
      form.setValue('avatar', url, { shouldDirty: true, shouldValidate: true })
    },
  })

  const isSubmitting = registerMutation.isPending || uploadAvatarMutation.isPending

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        {registerMutation.isError ? (
          <p className="text-sm text-destructive">
            {(registerMutation.error as Error)?.message ?? 'Unable to register'}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormDescription>
                    Upload a square PNG or JPG (max 5MB). We will store it in the
                    cloud for you.
                  </FormDescription>
                  <FormControl>
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept="image/*"
                        name={field.name}
                        onBlur={field.onBlur}
                        disabled={uploadAvatarMutation.isPending}
                        onChange={async (event) => {
                          const file = event.target.files?.[0]
                          if (!file) {
                            return
                          }
                          uploadAvatarMutation.mutate(file)
                          event.target.value = ''
                        }}
                      />
                      <div className="flex items-center gap-3 rounded-md border border-dashed bg-muted/40 p-3 text-sm">
                        <Avatar className="size-12">
                          {field.value ? (
                            <AvatarImage src={field.value} alt="Avatar preview" />
                          ) : null}
                          <AvatarFallback>
                            {form.getValues('firstName')?.charAt(0)?.toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={
                            uploadAvatarMutation.isError
                              ? 'text-destructive'
                              : field.value
                                ? 'text-emerald-600'
                                : 'text-muted-foreground'
                          }
                        >
                          {uploadAvatarMutation.isError
                            ? (uploadAvatarMutation.error as Error)?.message ?? 'Upload failed. Try again.'
                            : field.value
                              ? 'Avatar uploaded successfully'
                              : uploadAvatarMutation.isPending
                                ? 'Uploading avatar…'
                                : 'No avatar uploaded yet.'}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="docs_writer" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ada" autoComplete="given-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lovelace" autoComplete="family-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
