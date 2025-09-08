export interface SignInError {
  error: string;
}

export interface UserInfo {
  username: string;
  key: string;
  error?: string;
}
