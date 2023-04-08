import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientPromoService } from './client-promo.service';
@Controller('client-promo')
export class ClientPromoController {
  constructor(
    private clientPromoService: ClientPromoService,
  ) {}

  @Post()
  createDataClient(@Body() dto: CreateClientDto) {
    return this.clientPromoService.createClient(
      dto,
    );
  }
}
