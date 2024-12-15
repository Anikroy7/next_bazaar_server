import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { prisma } from "../../types/global";



const loginUser = async (payload: TLoginUser) => {
  //if the user is exist
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  })
  console.log('froim client', user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
  }
  //if the password is correct
  const isValid = await bcrypt.compare(payload.password, user.password);

  if (!isValid)
    throw new AppError(httpStatus.FORBIDDEN, "Invalid crediantial!");

  //create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,

  };

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgetPasswod = async (payload: { email: string }) => {
  //if the user is exist
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email }
  })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const resetURl = `${config.send_email_ui_link}/reset-password/?email=${user.email}&token=${accessToken}`;
  await sendEmail(payload.email, resetURl);
  return { resetURl };
};

const resetPasswod = async (payload: { email: string, newPassword: string }, token: string | undefined) => {
  // checking if the token is missing
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You have no access to this route!",
    );
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email } = decoded;
  if (email !== payload.email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Something invalid happen",
    );
  }
  // //if the user is exist
  const user = await prisma.user.findUniqueOrThrow({ where: { email: payload.email } })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid crediantial!");
  }
  const newPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updateUser = await prisma.user.update({
    where: { email: payload.email },
    data: {
      password: newPassword
    }
  })

  return updateUser;

}



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: email }
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,

  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};


export const AuthServices = {
  loginUser,
  forgetPasswod,
  resetPasswod,
  refreshToken
};
