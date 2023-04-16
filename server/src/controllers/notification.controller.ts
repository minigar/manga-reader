import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { successResponse } from 'src/helpers/success-response';
import { CurrentUser } from 'src/common/decorators';
import { NotificationService } from '../services/notification.service';

@Controller('nofitications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getList(@CurrentUser() { userId }) {
    return successResponse(await this.notificationService.getList(userId));
  }

  @Delete(':id')
  async deleteById(
    @CurrentUser() { userId },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return successResponse(
      await this.notificationService.deleteById(userId, id),
    );
  }
}
