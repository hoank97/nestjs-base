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

export enum CharCodeType {
  Number,
  All,
  Uppercase,
  Lowercase,
  NumberUppercase,
  NumberLowercase,
}

export const randomCode = (
  length: number,
  type: CharCodeType = CharCodeType.Lowercase,
  prefix?: string,
) => {
  const chars = {
    [CharCodeType.Number]: '0123456789',
    [CharCodeType.All]:
      '0123456789abcdefghjklmnpqrstuvxyzABCDEFGHJKLMNPQRSTUVXYZ',
    [CharCodeType.Uppercase]: 'ABCDEFGHJKLMNPQRSTUVXYZ',
    [CharCodeType.Lowercase]: 'abcdefghjklmnpqrstuvxyz',
    [CharCodeType.NumberLowercase]: '0123456789abcdefghjklmnpqrstuvxyz',
    [CharCodeType.NumberUppercase]: '0123456789ABCDEFGHJKLMNPQRSTUVXYZ',
  }[type];

  const charsLength = chars.length;
  const keys = [];
  for (let i = 0; i <= length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * charsLength);
    keys.push(chars[randomIndex]);
  }
  return prefix ? prefix + '_' + keys.join('') : keys.join('');
};
