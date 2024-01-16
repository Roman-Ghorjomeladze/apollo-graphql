import { object, string } from 'yup';
import { ERROR_MESSAGES } from '@src/interfaces/common';

export const logInSchema = object({
  username: string().required().min(3).max(15),
  password: string().required(),
});

export const signUpSchema = object({
  name: string().required().min(2).max(35),
  username: string().required().min(3).max(15, 'max length constrqaint'),
  password: string()
    .required()
    .min(6)
    .max(22)
    .matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/g, { message: ERROR_MESSAGES.BAD_PASSWORD }),
});
