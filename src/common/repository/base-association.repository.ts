import { Includeable } from 'sequelize';
import { BaseRepository } from './base.repositoty';

export abstract class BaseAssociationRepository extends BaseRepository {
  protected includeOptions: Map<string, Includeable | Includeable[]>;

  constructor() {
    super();
    this.includeOptions = new Map();
  }

  // For setup association
  protected setupAssociation() {}

  // For setup association
  protected setupIncludeOptions() {}

  // Implement on clild class
  protected getIncludeOption(key: string): Includeable | Includeable[] | any {}

  onApplicationBootstrap() {
    this.init();
    this.setupAssociation();
    this.setupIncludeOptions();
  }
}
