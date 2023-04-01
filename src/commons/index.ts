import * as bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  return bcrypt.hashSync(data, 10);
};

export const verifyHashed = async (
  data: string,
  encrypted: string,
): Promise<boolean> => {
  return bcrypt.compare(data, encrypted);
};
