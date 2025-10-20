import { userZodSchema, type TUser } from "../users/user.model";

const createUser = async (payload: TUser) => {
  const result = userZodSchema.safeParse(payload);
  if (!result.success) {
  }
};
