import { GraphQLResolveInfo } from 'graphql';
import { IApolloServerContext } from '@src/interfaces/IApolloServerContext';
import { ERROR_CODES, ERROR_MESSAGES } from '@src/interfaces/common';
import { throwGraphqlError } from './formatError';
import { createAuthorisedActionLog } from '@src/data/authorisedActionsService';

export const rejectIfUnAuthorised = (context: IApolloServerContext, _info?: GraphQLResolveInfo) => {
  if (!context.user) throwGraphqlError(ERROR_MESSAGES.UNAUTHORISED_EXCEPTION, ERROR_CODES.UNAUTHORISED_EXCEPTION);
  if (_info) {
    try {
      const variables = JSON.stringify(Object.values(_info.variableValues)[0], undefined, 2);
      const query = _info.operation.loc?.source.body.trim() || '';
      createAuthorisedActionLog(
        context.user?.id as number,
        query,
        String(_info.path.key),
        _info.path.typename || '',
        variables
      );
    } catch (error) {
      console.log(error);
    }
  }
};
