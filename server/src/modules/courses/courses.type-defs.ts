export const courseTypeDefs = `#graphql
  type Course {
    id: ID!
    name: String!
  }

  type Query {
    courses: [Course!]!
  }
`;
