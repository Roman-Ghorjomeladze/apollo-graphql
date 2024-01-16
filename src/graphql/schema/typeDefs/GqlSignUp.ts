import { GraphQLObjectType, GraphQLString } from 'graphql';

const GqlSignUp = new GraphQLObjectType({
  name: 'SignUp',
  description: 'Sign Up',
  fields: {
    message: {
      type: GraphQLString,
      description: 'Message text',
    },
  },
});

export default GqlSignUp;
