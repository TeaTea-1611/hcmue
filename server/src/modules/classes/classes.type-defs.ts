export const classesTypeDefs = `#graphql
  type Class {
    id: ID!
    name: String!
    course: Course!    
    faculty: Faculty!
    students: [Student!]!
  }

  type ClassMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    class: Class
    errors: [FieldError!]
  }

  input CreateClassInput {
    name: String!
    courseId: Int!
    facultyId: String!
  }

  type Query {
    classes: [Class!]!
  }

  type Mutation {
    createClass(createClassInput: CreateClassInput!): ClassMutationResponse
  }
`;
