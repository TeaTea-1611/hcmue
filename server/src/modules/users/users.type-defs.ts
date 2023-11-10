export const usersTypeDefs = `#graphql
  type Role {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String! 
    role: Role!
    createdAt: Date! 
  }

  type UserMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    user: User
    errors: [FieldError!]
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(username: String!, password: String!, roleId: String!): UserMutationResponse
    deleteUser(id: Int!): MutationResponse
  }
`;
