export interface UserInfo {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: UserInfo;
}
