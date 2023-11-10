export const modulesTypeDefs = `#graphql
  type Module {
    id: ID!
    name: String!
    credits: Int!
    faculty: Faculty!
  }

  input CreateModuleInput {
    id: String!
    name: String!
    facultyId: String!
    credits: Int!
  }

  type ModuleMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    module: Module
    errors: [FieldError!]
  }

  type Query {
    modules: [Module!]!
  }

  type Mutation {
    createModule(createModuleInput: CreateModuleInput!): ModuleMutationResponse
    deleteModule(id: String!): MutationResponse
  }
`;
