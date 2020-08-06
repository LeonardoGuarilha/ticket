import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TagRespository } from './tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRespository]), AuthModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
