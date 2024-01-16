import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const CreateBookInput = new GraphQLInputObjectType({
  name: 'CreateBookInput',
  description: 'Create book input',
  fields: {
    title: {
      type: GraphQLString,
      description: 'Title of the book',
    },
    description: {
      type: GraphQLString,
      description: 'Short description of the book',
    },
  },
});
