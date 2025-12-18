import { z } from 'zod';

export const signupRequestSchema = z.object({
	username: z.string().min(1, 'username is required'),
	email: z.email('email must be valid'),
	pass: z.string().min(1, 'password is required'),
	fullName: z.string().min(1, 'full name is required'),
});
export type SignupRequest = z.infer<typeof signupRequestSchema>;

export const loginRequestSchema = z.object({
	username: z.string().min(1, 'username is required'),
	pass: z.string().min(1, 'password is required'),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const googleLoginRequestSchema = z.object({
	idToken: z.string().min(1, 'Missing Google credential'),
});
export type GoogleLoginRequest = z.infer<typeof googleLoginRequestSchema>;

export interface ProfileResponse {
	id: string;
	fullName: string;
	avatarUrl: string | null;
	bio: string | null;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	id: string;
	profile: ProfileResponse;
}
