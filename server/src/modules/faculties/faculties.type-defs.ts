export const facultiesTypeDefs = `#graphql
  type Faculty {
    id: ID!
    name: String!
    address: String!
    email: String!
    numberPhone: String!
    classes: [Class!]!
    trainingFields: [TrainingField!]!
    
  }

  type FacultyMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    faculty: Faculty 
    errors: [FieldError!]
  }

  type Query {
    faculty(id: Int): Faculty
    faculties: [Faculty!]!
  }

  type Mutation { 
    createFaculty(id: String!, name: String!, address: String!, numberPhone: String!, email: String!): FacultyMutationResponse
    updateFaculty(id: String!, address: String!, numberPhone: String!, email: String!): FacultyMutationResponse
    deleteFaculty(id: String!): MutationResponse
  }
`;
