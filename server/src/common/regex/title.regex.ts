import { TitleErrorKey } from 'src/controllers/errorKeys';
import { BusinessError } from 'src/errors/businessErrors/businessError';

export const validName = async (str: string): Promise<boolean> => {
  const regex = /^[a-zA-Z0-9_:!@&-.`"?^$#№+=-~]{4,}$/; // accept only latin a-Z with number, minimum 4 max 14 symbols

  const isMatch = regex.test(str);

  if (!isMatch) throw new BusinessError(TitleErrorKey.BAD_NAME_VALIDATION);

  return isMatch;
};
