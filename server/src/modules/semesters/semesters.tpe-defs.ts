export const semestersTypeDefs = `#graphql
  type Semester {
    id: ID!
    name: String!
    academicYear: AcademicYear!
  }

  type SemesterYearMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    semester: Semester 
    errors: [FieldError!]
  }

  type Query {
    semesters(academicYearId: Int!): [Semester]
  }

  type Mutation {
    createSemester(name: String!, academicYearId: Int!): AcademicYearMutationResponse
    deleteSemester(id: Int!): MutationResponse
  }
`;
