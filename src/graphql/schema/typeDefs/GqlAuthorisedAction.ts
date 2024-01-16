import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const GqlAuthorisedAction = new GraphQLObjectType({
  name: 'GqlAuthorisedAction',
  description: 'Authorised Action',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'Id of the action',
    },
    body: {
      type: GraphQLString,
      description: 'Query of the action',
    },
    variables: {
      type: GraphQLString,
      description: 'Variables of the action',
    },
    key: {
      type: GraphQLString,
      description: 'Key of the action',
    },
    typename: {
      type: GraphQLString,
      description: 'Typename of the action',
    },
    user_id: {
      type: GraphQLInt,
      description: 'User id of the action creator',
    },
  },
});

export default GqlAuthorisedAction;
