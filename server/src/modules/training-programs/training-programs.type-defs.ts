export const trainingProgramsTypeDefs = `#graphql
  type TrainingProgram {
    id: ID!
    name: String!
  }

  type Query {
    trainingPrograms: [TrainingProgram!]!
  }
`;
