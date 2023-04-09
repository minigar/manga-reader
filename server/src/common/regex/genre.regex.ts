import { GenreErrorKey } from 'src/controllers/errorKeys/GenreErrorKey';
import { BusinessError } from 'src/errors/businessErrors/businessError';

export const validName = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z_-]{3,10}$/; // accept only latin a-Z and '_', '-'

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(GenreErrorKey.BAD_NAME_VALIDATION);

  return isMatch;
};
