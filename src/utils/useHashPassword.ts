import * as bcrypt from 'bcrypt';

export const useHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
