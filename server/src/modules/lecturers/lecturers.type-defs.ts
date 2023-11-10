export const lecturersTypeDefs = `#graphql
  type Lecturer {
    id: ID!
    name: String!
    dob: String!
    email: String!
    numberPhone: String!
    createdAt: Date!
    position: Position
    trainingFields: [TrainingField!]!
  }

  type LecturerMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    lecturer: Lecturer
    errors: [FieldError!]
  }

  input CreateLecturerInput {
    username: String!
    password: String!
    id: String!
    name: String!
    dob: String!
    email: String!
    numberPhone: String!
    positionId: String
    facultyId: String
  }

  type Query {
    lecturers: [Lecturer!]!
  }

  type Mutation {
    createLecturer(createLecturerInput: CreateLecturerInput!): LecturerMutationResponse!
    deleteLecturer(id: String!): MutationResponse!
  }
`;
