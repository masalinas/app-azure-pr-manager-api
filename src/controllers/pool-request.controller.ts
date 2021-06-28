// Uncomment these imports to begin using these cool features!
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {PoolRequest} from '../models';

const {exec} = require('child_process');

export class PoolRequestController {
  constructor() { }

  @get('/prs', {
    responses: {
      '200': {
        description: 'Array of PRs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PoolRequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<PoolRequest[]> {
    return new Promise(function (resolve, reject) {
      exec('az repos pr list --organization https://dev.azure.com/ECCAIRS2/ --project ECCAIRS2 --creator jose.jurado@twtspain.com --status all --query "@[*].{description:description, closedDate:closedDate, reviewers:reviewers[*].{displayName:displayName}, createdBy:createdBy.uniqueName, title:title, status:status, repository:repository.name, sourceRefName:sourceRefName, targetRefName:targetRefName}" -o json', (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(stdout.trim());
      });
    });
  }

  @get('/prs/{username}', {
    responses: {
      '200': {
        description: 'PR model instance By username',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PoolRequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('username') username: string
  ): Promise<PoolRequest> {
    return new Promise(function (resolve, reject) {
      exec('az repos pr list --organization https://dev.azure.com/ECCAIRS2/ --project ECCAIRS2 --creator ' + username + ' --status all --query "@[*].{description:description, closedDate:closedDate, reviewers:reviewers[*].{displayName:displayName}, createdBy:createdBy.uniqueName, title:title, status:status, repository:repository.name, sourceRefName:sourceRefName, targetRefName:targetRefName}" -o json', (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(stdout.trim());
      });
    });
  }
}
