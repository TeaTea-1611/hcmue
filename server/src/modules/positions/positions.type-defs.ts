export const positionsTypeDefs = `#graphql
  type Position {
    id: ID!
    name: String!
    role: Role!
  }

  type PositionMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    position: Position
    errors: [FieldError!]
  }

  type Query {
    positions(roleId: String!): [Position!]!
  }
`;
