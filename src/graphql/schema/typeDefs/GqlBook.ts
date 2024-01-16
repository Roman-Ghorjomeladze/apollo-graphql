import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

const GqlBook = new GraphQLObjectType({
  name: 'Book',
  description: 'A book',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Id of the book',
    },
    title: {
      type: GraphQLString,
      description: 'Title of the book',
    },
    description: {
      type: GraphQLString,
      description: 'Description of the book',
    },
    author_id: {
      type: GraphQLInt,
      description: 'Author id of the book',
    },
  },
});

export default GqlBook;
