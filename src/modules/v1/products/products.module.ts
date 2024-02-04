import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, Logger],
})
export class ProductsModule {}
