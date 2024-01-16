import { object, string } from 'yup';

export const bookSchema = object({
  title: string().required().min(2),
  description: string().required().min(2),
});
