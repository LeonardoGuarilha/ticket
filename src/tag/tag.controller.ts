import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
@UseGuards(AuthGuard())
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  createTag(@Body('nome') nome: string): Promise<Tag> {
    return this.tagService.createTag(nome);
  }
}
