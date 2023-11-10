export const academicYearsTypeDefs = `#graphql
  type AcademicYear {
    id: ID!
    name: String!
    semesters: [Semester!]!
  }

  type AcademicYearMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    academicYear: AcademicYear 
    errors: [FieldError!]
  }

  type Query {
    academicYears: [AcademicYear!]
  }

  type Mutation {
    createAcademicYear(name: String!): AcademicYearMutationResponse
    deleteAcademicYear(id: Int!): MutationResponse
  }
`;
