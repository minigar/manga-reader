import { AuthErrorKey } from 'src/controllers/errorKeys';
import { BusinessError } from 'src/errors/businessErrors/businessError';

export const validPassw = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=\\[\]{}|;':",./<>?]{4,}$/;

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(AuthErrorKey.PASSWORD_BAD_VALIDATION);

  return isMatch;
};
