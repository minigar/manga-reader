import { ListErrorKey } from 'src/controllers/errorKeys';
import { BusinessError } from 'src/errors/businessErrors/businessError';

export const validName = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z]{4,}$/; //accept only latin letter

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(ListErrorKey.NAME_BAD_VALIDATION);

  return isMatch;
};
