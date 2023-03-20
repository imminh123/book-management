import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  @ApiOperation({
    operationId: 'health',
    description: 'Health check',
  })
  @Get()
  createUser() {
    return { message: 'ok' };
  }
}
