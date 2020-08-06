import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRespository } from './tag.repository';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRespository)
    private tagRepository: TagRespository,
  ) {}

  async createTag(nome: string): Promise<Tag> {
    return await this.tagRepository.createTag(nome);
  }
}
