export interface Entity {
  end: number;
  entity_group: string;
  score: number;
  start: number;
  word: string;
}

export interface NERResponse {
  entities: Entity[];
  message: string;
}
