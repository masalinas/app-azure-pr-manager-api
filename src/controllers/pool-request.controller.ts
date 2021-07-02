// Uncomment these imports to begin using these cool features!
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {PoolRequest} from '../models';

const {exec} = require('child_process');

export class PoolRequestController {
  constructor() { }

  @get('/prs/{skip}/{top}/{username}', {
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
  async findById(@param.query.string('skip', {required: true}) skip: number, @param.query.string('top', {required: true}) top: number, @param.query.string('username') username?: string): Promise<PoolRequest> {
    return new Promise(function (resolve, reject) {
      let request: string;
      console.log (username);

      if (username)
        request = 'az repos pr list --organization https://dev.azure.com/ECCAIRS2/ --project ECCAIRS2 --creator ' + username + ' --status all --query "@[*].{description:description, closedDate:closedDate, reviewers:reviewers[*].{displayName:displayName}, createdBy:createdBy.uniqueName, title:title, status:status, repository:repository.name, sourceRefName:sourceRefName, targetRefName:targetRefName}" --skip ' + skip + ' --top ' + top + ' -o json';
      else
        request = 'az repos pr list --organization https://dev.azure.com/ECCAIRS2/ --project ECCAIRS2 --status all --query "@[*].{description:description, closedDate:closedDate, reviewers:reviewers[*].{displayName:displayName}, createdBy:createdBy.uniqueName, title:title, status:status, repository:repository.name, sourceRefName:sourceRefName, targetRefName:targetRefName}" --skip ' + skip + ' --top ' + top + ' -o json';

      exec(request, (error: any, stdout: any, stderr: any) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(stdout.trim());
      });
    });
  }
}
