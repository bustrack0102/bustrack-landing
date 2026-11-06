export type AuthFailureKind =
  | 'None'
  | 'Invalid'
  | 'Locked'
  | 'RateLimited'
  | 'Network';

export interface LoginRequestDto {
  strNombreUsuario: string;
  strPWD: string;
}

export interface LoginResponseDto {
  strToken?: string;
  dteExpira?: string;
}

export interface UserSession {
  userName: string;
  bearerValue: string;
  expiresAtIso: string;
  rememberMe: boolean;
}

export interface AuthResult {
  succeeded: boolean;
  kind: AuthFailureKind;
  session?: UserSession;
  message?: string;
}
