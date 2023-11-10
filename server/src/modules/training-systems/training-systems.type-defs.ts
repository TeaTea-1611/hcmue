export const trainingSystemsTypeDefs = `#graphql
  type TrainingSystem {
    id: ID!
    name: String!
  }

  type Query {
    trainingSystems: [TrainingSystem!]!
  }
`;
