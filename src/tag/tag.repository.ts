import { Repository, EntityRepository } from 'typeorm';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRespository extends Repository<Tag> {
  async createTag(nome: string): Promise<Tag> {
    const tag = new Tag();

    tag.nome = nome;

    await tag.save();

    return tag;
  }
}
