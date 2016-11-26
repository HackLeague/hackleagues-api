import * as path from 'path';
import * as Express from 'express';
import { ApolloOptions } from 'graphql-server';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress, ExpressGraphQLOptionsFunction } from 'graphql-server-express';
import * as bodyParser from 'body-parser';


let PORT: number = 3010;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}
const app: Express.Application = Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const graphqlSchema = `
  type User {
    id:ID!,
    email:String!,
    verifyEmailToken:String!,
    username: String,
    roles: [Role],
    created_at:String,
    updated_at:String
  }

  type Role{
  }
  type AuthenticationToken{
    token:String!
  }

  type Query {
    me(): User,
    getUserByEmail(email: String!): User
  }

  type Mutation {
    login(email: String!),
    verifyEmail(email: String!, token:String!): AuthenticationToken,
    logout(token:String!)
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
const createResolvers = (models) => ({
  Query: {
    me(){
      return {
        username: 'barr3',
        email: 'hello',
      }
    },
    getUserByEmail(root, { id }) {
      return {
        username: 'barry3',
        email: 'rowValue1',
      }
    },
  },
  Mutation: {
    login(root, args) {

    },
    verifyEmail() {

    },
    logout() {
      
    }
  },
});
const schema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers(null),
});

const graphQLOtions: ExpressGraphQLOptionsFunction = (req: Express.Request): ApolloOptions => {

  const query = req.query.query || req.body.query;
  console.log("Query GraphQl ", query);
  if (query && query.length > 2000) {

    throw new Error('Query too large.');
  }

  const response: ApolloOptions = {
    schema,
    context: {

    },
  };
  return response;
};

app.use('/graphql', graphqlExpress(graphQLOtions));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `
`,
}));

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `API Server is now running on http://localhost:${PORT}`
));

