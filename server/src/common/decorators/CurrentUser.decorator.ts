import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDecoded } from 'src/models/User.dto';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!data) return req.user;
    return <UserDecoded>req.user.data;
  },
);
