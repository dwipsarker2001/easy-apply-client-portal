export interface UserInfo {
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
  userAvatar: string | undefined;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: UserInfo;
}

export interface RegisterFormValues {
  fullName: string;
  phoneNumber: string;
}

export interface RegisterFormErrors {
  fullName?: string;
  phoneNumber?: string;
}
