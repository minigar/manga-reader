import { keyBy } from 'lodash';
import { UserErrorKey } from 'src/controllers/errorKeys';

export const BusinessErrorsMap = keyBy(
  [
    {
      code: UserErrorKey.USER_NOT_FOUND,
      message: 'User not found!',
    },
  ],
  (err: { code: any }) => err.code,
);
