import { Module } from '@nestjs/common';
import { ClientPromoController } from './client-promo.controller';
import { ClientPromoService } from './client-promo.service';

@Module({
  controllers: [ClientPromoController],
  providers: [ClientPromoService],
})
export class ClientPromoModule {}
