import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TicketModule, AuthModule],
})
export class AppModule {}
