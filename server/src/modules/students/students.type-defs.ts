export const studentsTypeDefs = `#graphql
  type Position {
    id: ID!
    name: String!
  }

  type Student {
    id: ID!
    name: String!
    createdAt: Date!
    studentType: String!
    studyStatus: String!
    gender: Int!
    dob: String!
    pob: String!  
    ethnicity: String!
    identification: String!
    religion: String!
    area: String!  
    priority: Boolean 
    province: String!   
    district: String!
    country: String!  
    permanentAddress: String!  
    numberPhone: String!
    email: String!
    address: String!
    fatherName: String!
    motherName: String!
    relativeName: String!
    relativeNumberPhone: String!
    relativeAddress: String!
    class: Class!
    position: Position
    course: Course!
    user: User
    faculty: Faculty!
    # studentsOnModuleGrades: [StudentsOnModuleGrades]
    # registrations: [Registration]
    # tuitionFees: [TuitionFee]
  }

  input CreateStudentInput {
    username: String!
    password: String!
    id: String!
    name: String!
    studentType: String!
    studyStatus: String!
    gender: Int!
    dob: String!
    pob: String!  
    ethnicity: String!  
    identification: String!  
    religion: String!
    area: String!  
    priority: Boolean!
    province: String!
    district: String!
    country: String!
    permanentAddress: String!  
    numberPhone: String!
    email: String!
    address: String!
    fatherName: String!
    motherName: String!
    relativeName: String!
    relativeNumberPhone: String!
    relativeAddress: String!
    classId: Int!
    positionId: String
    courseId: Int!
    facultyId: String!
    trainingFieldId: Int!
  }

  type StudentMutationResponse implements MutationResponse { 
    success: Boolean!
    message: String
    student: Student
    errors: [FieldError!]
  }

  type StudentPaginatedMutationResponse {
    students: [Student!]!
    totalCount: Int!
  }

  type Query {
    paginatedStudents(pageIndex: Int, take: Int, studentId: String): StudentPaginatedMutationResponse!
    students: [Student!]!
  }

  type Mutation {
    createStudent(createStudentInput: CreateStudentInput!): StudentMutationResponse
  }
`;
