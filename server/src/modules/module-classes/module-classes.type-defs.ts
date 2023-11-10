export const moduleClassesTypeDefs = `#graphql
  type ModuleClass {
    id: ID!
    semester: Semester!
    schoolDay: Int!
    classStart: Int!
    classEnd: Int!
    startDate: Date!
    startEnd: Date!
    maximum: Int!
    testDate: Date
    createdAt: Date!
    lecturer: Lecturer!
    room: String
    module: Module!
  }

  input CreateModuleClassInput {
    id: String!
    semesterId: Int!
    schoolDay: Int!
    classStart: Int!
    classEnd: Int!
    startDate: Date!
    startEnd: Date!
    maximum: Int!
    testDate: Date
    createdAt: Date!
    lecturerId: String!
    room: String
    moduleId: String!
  }

  type ModuleClassMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    moduleClass: ModuleClass
    errors: [FieldError!]
  }

  type Query {
    moduleClasses: [ModuleClass!]!
  }

  type Mutation {
    createModuleClass(createModuleClassInput: CreateModuleClassInput!): ModuleClassMutationResponse
    deleteModuleClass(id: Int!): MutationResponse
  }
`;
