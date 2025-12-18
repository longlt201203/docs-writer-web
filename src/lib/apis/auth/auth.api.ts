import { postRequest } from '../base';
import type { BaseResponse } from '../dto';
import type {
	AuthResponse,
	GoogleLoginRequest,
	LoginRequest,
	SignupRequest,
} from './auth.dto';

const AUTH_BASE_URL = '/api/auth';

type AuthPromise = Promise<BaseResponse<AuthResponse>>;

const authEndpoint = (path: string) => `${AUTH_BASE_URL}${path}`;

export const signup = (payload: SignupRequest): AuthPromise =>
	postRequest<AuthResponse, SignupRequest>(
		authEndpoint('/signup'),
		payload,
	);

export const login = (payload: LoginRequest): AuthPromise =>
	postRequest<AuthResponse, LoginRequest>(
		authEndpoint('/login'),
		payload,
	);

export const googleLogin = (
	payload: GoogleLoginRequest,
): AuthPromise =>
	postRequest<AuthResponse, GoogleLoginRequest>(
		authEndpoint('/google'),
		payload,
	);

export const authApi = {
	signup,
	login,
	googleLogin,
};
