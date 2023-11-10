export const authTypeDefs = `#graphql
  type LoginMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String!
    accessToken: String
    user: User
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(loginInput: LoginInput!): LoginMutationResponse
    logout: Boolean!
  }
`;
