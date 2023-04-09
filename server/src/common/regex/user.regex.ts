import { AuthErrorKey } from 'src/controllers/errorKeys';
import { BusinessError } from 'src/errors/businessErrors/businessError';

export const validPassw = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=\\[\]{}|;':",./<>?]{4,}$/; // accept only latin a-Z with number and symbols

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(AuthErrorKey.PASSWORD_BAD_VALIDATION);

  return isMatch;
};

export const validName = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z0-9_\S]{2,14}$/; // accept only latin a-Z with number, minimum 2 max 14 symbols with no spaces

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(AuthErrorKey.USERNAME_BAD_VALIDATION);

  return isMatch;
};
