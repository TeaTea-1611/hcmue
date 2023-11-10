export const trainingFieldsTypeDefs = `#graphql


  type TrainingField {
    id: ID!
    name: String!
    faculty: Faculty!
    trainingSystem: TrainingSystem!                      
    trainingType: TrainingType!
    courses: [Course!]!
    trainingFieldToProgramToCourse: [TrainingFieldToProgramToCourse!]!
  }

  type TrainingFieldToProgramToCourse {
    trainingField: TrainingField!
    trainingProgram: TrainingProgram!
    course: Course!
  }

  type Query {
    trainingFields: [TrainingField!]!
  }
`;
