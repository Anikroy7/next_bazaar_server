import { UserStatus } from "@prisma/client";
import { USER_ROLE } from "./user.constant";

export type TADMIN = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  address: string;
  role: "ADMIN"
  status: UserStatus,
  isDeleted: boolean
};


export type TUserRole = keyof typeof USER_ROLE;
