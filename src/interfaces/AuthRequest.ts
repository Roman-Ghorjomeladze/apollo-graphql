import { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';

export type SignUpRequest = {
  input: {
    username: string;
    password: string;
    name: string;
  };
};

export type SignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export interface IJWTPayload extends JwtPayload {
  id: number;
}
