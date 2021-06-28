import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PoolRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @property({
    type: 'date',
    required: true,
  })
  closedDate: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  reviewers: string[];

  @property({
    type: 'string',
    required: true,
  })
  sourceRefName: string;

  @property({
    type: 'string',
    required: true,
  })
  targetRefName: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PoolRequest>) {
    super(data);
  }
}

export interface PoolRequestRelations {
  // describe navigational properties here
}

export type PoolRequestWithRelations = PoolRequest & PoolRequestRelations;
