export const trainingTypesTypeDefs = `#graphql
  type TrainingType {
    id: ID!
    name: String!
  }

  type Query {
    trainingTypes: [TrainingType!]!
  }
`;
