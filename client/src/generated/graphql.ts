import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AcademicYear = {
  __typename?: 'AcademicYear';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  semesters: Array<Semester>;
};

export type AcademicYearMutationResponse = MutationResponse & {
  __typename?: 'AcademicYearMutationResponse';
  academicYear?: Maybe<AcademicYear>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Class = {
  __typename?: 'Class';
  course: Course;
  faculty: Faculty;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  students: Array<Student>;
};

export type ClassMutationResponse = MutationResponse & {
  __typename?: 'ClassMutationResponse';
  class?: Maybe<Class>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateClassInput = {
  courseId: Scalars['Int']['input'];
  facultyId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateStudentInput = {
  address: Scalars['String']['input'];
  area: Scalars['String']['input'];
  classId: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  courseId: Scalars['Int']['input'];
  district: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  ethnicity: Scalars['String']['input'];
  facultyId: Scalars['String']['input'];
  fatherName: Scalars['String']['input'];
  gender: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  identification: Scalars['String']['input'];
  motherName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permanentAddress: Scalars['String']['input'];
  pob: Scalars['String']['input'];
  positionId?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['Boolean']['input'];
  province: Scalars['String']['input'];
  relativeAddress: Scalars['String']['input'];
  relativeName: Scalars['String']['input'];
  relativeNumberPhone: Scalars['String']['input'];
  religion: Scalars['String']['input'];
  studentType: Scalars['String']['input'];
  studyStatus: Scalars['String']['input'];
  trainingFieldId: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};

export type Faculty = {
  __typename?: 'Faculty';
  address: Scalars['String']['output'];
  classes: Array<Class>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
  trainingFields: Array<TrainingField>;
};

export type FacultyMutationResponse = MutationResponse & {
  __typename?: 'FacultyMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  faculty?: Maybe<Faculty>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginMutationResponse = MutationResponse & {
  __typename?: 'LoginMutationResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAcademicYear?: Maybe<AcademicYearMutationResponse>;
  createClass?: Maybe<ClassMutationResponse>;
  createFaculty?: Maybe<FacultyMutationResponse>;
  createSemester?: Maybe<AcademicYearMutationResponse>;
  createStudent?: Maybe<StudentMutationResponse>;
  createUser?: Maybe<UserMutationResponse>;
  deleteAcademicYear?: Maybe<MutationResponse>;
  deleteFaculty?: Maybe<MutationResponse>;
  deleteSemester?: Maybe<MutationResponse>;
  deleteUser?: Maybe<MutationResponse>;
  login?: Maybe<LoginMutationResponse>;
  logout: Scalars['Boolean']['output'];
  updateFaculty?: Maybe<FacultyMutationResponse>;
};


export type MutationCreateAcademicYearArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateClassArgs = {
  createClassInput: CreateClassInput;
};


export type MutationCreateFacultyArgs = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
};


export type MutationCreateSemesterArgs = {
  academicYearId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateStudentArgs = {
  createStudentInput: CreateStudentInput;
};


export type MutationCreateUserArgs = {
  password: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteAcademicYearArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteFacultyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSemesterArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateFacultyArgs = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
};

export type MutationResponse = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
};

export type PositionMutationResponse = MutationResponse & {
  __typename?: 'PositionMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  academicYears?: Maybe<Array<AcademicYear>>;
  classes: Array<Class>;
  courses: Array<Course>;
  faculties: Array<Faculty>;
  faculty?: Maybe<Faculty>;
  me?: Maybe<User>;
  paginatedStudents: StudentPaginatedMutationResponse;
  positions: Array<Position>;
  semesters?: Maybe<Array<Maybe<Semester>>>;
  students: Array<Student>;
  trainingFields: Array<TrainingField>;
  trainingPrograms: Array<TrainingProgram>;
  trainingSystems: Array<TrainingSystem>;
  trainingTypes: Array<TrainingType>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryFacultyArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPaginatedStudentsArgs = {
  pageIndex?: InputMaybe<Scalars['Int']['input']>;
  studentId?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPositionsArgs = {
  roleId: Scalars['String']['input'];
};


export type QuerySemestersArgs = {
  academicYearId: Scalars['Int']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Semester = {
  __typename?: 'Semester';
  academicYear: AcademicYear;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SemesterYearMutationResponse = MutationResponse & {
  __typename?: 'SemesterYearMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  semester?: Maybe<Semester>;
  success: Scalars['Boolean']['output'];
};

export type Student = {
  __typename?: 'Student';
  address: Scalars['String']['output'];
  area: Scalars['String']['output'];
  class: Class;
  country: Scalars['String']['output'];
  course: Course;
  createdAt: Scalars['Date']['output'];
  district: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  ethnicity: Scalars['String']['output'];
  faculty: Faculty;
  fatherName: Scalars['String']['output'];
  gender: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  identification: Scalars['String']['output'];
  motherName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
  permanentAddress: Scalars['String']['output'];
  pob: Scalars['String']['output'];
  position?: Maybe<Position>;
  priority?: Maybe<Scalars['Boolean']['output']>;
  province: Scalars['String']['output'];
  relativeAddress: Scalars['String']['output'];
  relativeName: Scalars['String']['output'];
  relativeNumberPhone: Scalars['String']['output'];
  religion: Scalars['String']['output'];
  studentType: Scalars['String']['output'];
  studyStatus: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type StudentMutationResponse = MutationResponse & {
  __typename?: 'StudentMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  success: Scalars['Boolean']['output'];
};

export type StudentPaginatedMutationResponse = {
  __typename?: 'StudentPaginatedMutationResponse';
  students: Array<Student>;
  totalCount: Scalars['Int']['output'];
};

export type TrainingField = {
  __typename?: 'TrainingField';
  courses: Array<Course>;
  faculty: Faculty;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  trainingFieldToProgramToCourse: Array<TrainingFieldToProgramToCourse>;
  trainingSystem: TrainingSystem;
  trainingType: TrainingType;
};

export type TrainingFieldToProgramToCourse = {
  __typename?: 'TrainingFieldToProgramToCourse';
  course: Course;
  trainingField: TrainingField;
  trainingProgram: TrainingProgram;
};

export type TrainingProgram = {
  __typename?: 'TrainingProgram';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TrainingSystem = {
  __typename?: 'TrainingSystem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TrainingType = {
  __typename?: 'TrainingType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  role: Role;
  username: Scalars['String']['output'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type ClassInfoFragment = { __typename?: 'Class', id: string, name: string };

export type CourseInfoFragment = { __typename?: 'Course', id: string, name: string };

export type TrainingFieldInfoFragment = { __typename?: 'TrainingField', id: string, name: string, trainingSystem: { __typename?: 'TrainingSystem', id: string, name: string }, trainingType: { __typename?: 'TrainingType', id: string, name: string }, courses: Array<{ __typename?: 'Course', id: string, name: string }> };

export type FacultyInfoFragment = { __typename?: 'Faculty', id: string, name: string, address: string, email: string, numberPhone: string, classes: Array<{ __typename?: 'Class', id: string, name: string }>, trainingFields: Array<{ __typename?: 'TrainingField', id: string, name: string, trainingSystem: { __typename?: 'TrainingSystem', id: string, name: string }, trainingType: { __typename?: 'TrainingType', id: string, name: string }, courses: Array<{ __typename?: 'Course', id: string, name: string }> }> };

export type PositionInfoFragment = { __typename?: 'Position', id: string, name: string };

export type StudentInfoFragment = { __typename?: 'Student', id: string, name: string, createdAt: any, studentType: string, studyStatus: string, gender: number, dob: string, pob: string, ethnicity: string, identification: string, religion: string, area: string, priority?: boolean | null, province: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, fatherName: string, motherName: string, relativeName: string, relativeNumberPhone: string, relativeAddress: string, class: { __typename?: 'Class', id: string, name: string }, position?: { __typename?: 'Position', id: string, name: string } | null, course: { __typename?: 'Course', id: string, name: string }, faculty: { __typename?: 'Faculty', id: string, name: string } };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, createdAt: any, role: { __typename?: 'Role', id: string, name: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginMutationResponse', success: boolean, message: string, accessToken?: string | null, user?: { __typename?: 'User', id: string, username: string, createdAt: any, role: { __typename?: 'Role', id: string, name: string } } | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateStudentMutationVariables = Exact<{
  createStudentInput: CreateStudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent?: { __typename?: 'StudentMutationResponse', success: boolean, message?: string | null, student?: { __typename?: 'Student', id: string, name: string, createdAt: any, studentType: string, studyStatus: string, gender: number, dob: string, pob: string, ethnicity: string, identification: string, religion: string, area: string, priority?: boolean | null, province: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, fatherName: string, motherName: string, relativeName: string, relativeNumberPhone: string, relativeAddress: string, user?: { __typename?: 'User', id: string, username: string, createdAt: any, role: { __typename?: 'Role', id: string, name: string } } | null, class: { __typename?: 'Class', id: string, name: string }, position?: { __typename?: 'Position', id: string, name: string } | null, course: { __typename?: 'Course', id: string, name: string }, faculty: { __typename?: 'Faculty', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null } | null };

export type AcademicYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type AcademicYearsQuery = { __typename?: 'Query', academicYears?: Array<{ __typename?: 'AcademicYear', id: string, name: string }> | null };

export type SemestersQueryVariables = Exact<{
  academicYearId: Scalars['Int']['input'];
}>;


export type SemestersQuery = { __typename?: 'Query', semesters?: Array<{ __typename?: 'Semester', id: string, name: string } | null> | null };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: string, name: string }> };

export type StudentCreationFacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentCreationFacultiesQuery = { __typename?: 'Query', faculties: Array<{ __typename?: 'Faculty', id: string, name: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, createdAt: any, role: { __typename?: 'Role', id: string, name: string } } | null };

export type PaginatedStudentsQueryVariables = Exact<{
  pageIndex?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  studentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PaginatedStudentsQuery = { __typename?: 'Query', paginatedStudents: { __typename?: 'StudentPaginatedMutationResponse', totalCount: number, students: Array<{ __typename?: 'Student', id: string, name: string, createdAt: any, studentType: string, studyStatus: string, gender: number, dob: string, pob: string, ethnicity: string, identification: string, religion: string, area: string, priority?: boolean | null, province: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, fatherName: string, motherName: string, relativeName: string, relativeNumberPhone: string, relativeAddress: string, class: { __typename?: 'Class', id: string, name: string }, position?: { __typename?: 'Position', id: string, name: string } | null, course: { __typename?: 'Course', id: string, name: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }> } };

export type TrainingFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type TrainingFieldsQuery = { __typename?: 'Query', trainingFields: Array<{ __typename?: 'TrainingField', id: string, name: string, faculty: { __typename?: 'Faculty', id: string, name: string, classes: Array<{ __typename?: 'Class', id: string, name: string }> }, trainingSystem: { __typename?: 'TrainingSystem', id: string, name: string }, trainingType: { __typename?: 'TrainingType', id: string, name: string }, courses: Array<{ __typename?: 'Course', id: string, name: string }>, trainingFieldToProgramToCourse: Array<{ __typename?: 'TrainingFieldToProgramToCourse', course: { __typename?: 'Course', id: string, name: string }, trainingProgram: { __typename?: 'TrainingProgram', id: string, name: string } }> }> };

export const ClassInfoFragmentDoc = gql`
    fragment classInfo on Class {
  id
  name
}
    `;
export const CourseInfoFragmentDoc = gql`
    fragment courseInfo on Course {
  id
  name
}
    `;
export const TrainingFieldInfoFragmentDoc = gql`
    fragment trainingFieldInfo on TrainingField {
  id
  name
  trainingSystem {
    id
    name
  }
  trainingType {
    id
    name
  }
  courses {
    ...courseInfo
  }
}
    ${CourseInfoFragmentDoc}`;
export const FacultyInfoFragmentDoc = gql`
    fragment facultyInfo on Faculty {
  id
  name
  address
  email
  numberPhone
  classes {
    ...classInfo
  }
  trainingFields {
    ...trainingFieldInfo
  }
}
    ${ClassInfoFragmentDoc}
${TrainingFieldInfoFragmentDoc}`;
export const PositionInfoFragmentDoc = gql`
    fragment positionInfo on Position {
  id
  name
}
    `;
export const StudentInfoFragmentDoc = gql`
    fragment studentInfo on Student {
  id
  name
  createdAt
  studentType
  studyStatus
  gender
  dob
  pob
  ethnicity
  identification
  religion
  area
  priority
  province
  district
  country
  permanentAddress
  numberPhone
  email
  address
  fatherName
  motherName
  relativeName
  relativeNumberPhone
  relativeAddress
  class {
    id
    name
  }
  position {
    id
    name
  }
  course {
    id
    name
  }
  faculty {
    id
    name
  }
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  role {
    id
    name
  }
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    success
    message
    accessToken
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateStudentDocument = gql`
    mutation CreateStudent($createStudentInput: CreateStudentInput!) {
  createStudent(createStudentInput: $createStudentInput) {
    success
    message
    student {
      ...studentInfo
      user {
        ...userInfo
      }
    }
    errors {
      path
      message
    }
  }
}
    ${StudentInfoFragmentDoc}
${UserInfoFragmentDoc}`;
export type CreateStudentMutationFn = Apollo.MutationFunction<CreateStudentMutation, CreateStudentMutationVariables>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      createStudentInput: // value for 'createStudentInput'
 *   },
 * });
 */
export function useCreateStudentMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentMutation, CreateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument, options);
      }
export type CreateStudentMutationHookResult = ReturnType<typeof useCreateStudentMutation>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<CreateStudentMutation, CreateStudentMutationVariables>;
export const AcademicYearsDocument = gql`
    query AcademicYears {
  academicYears {
    id
    name
  }
}
    `;

/**
 * __useAcademicYearsQuery__
 *
 * To run a query within a React component, call `useAcademicYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcademicYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcademicYearsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcademicYearsQuery(baseOptions?: Apollo.QueryHookOptions<AcademicYearsQuery, AcademicYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AcademicYearsQuery, AcademicYearsQueryVariables>(AcademicYearsDocument, options);
      }
export function useAcademicYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AcademicYearsQuery, AcademicYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AcademicYearsQuery, AcademicYearsQueryVariables>(AcademicYearsDocument, options);
        }
export type AcademicYearsQueryHookResult = ReturnType<typeof useAcademicYearsQuery>;
export type AcademicYearsLazyQueryHookResult = ReturnType<typeof useAcademicYearsLazyQuery>;
export type AcademicYearsQueryResult = Apollo.QueryResult<AcademicYearsQuery, AcademicYearsQueryVariables>;
export const SemestersDocument = gql`
    query Semesters($academicYearId: Int!) {
  semesters(academicYearId: $academicYearId) {
    id
    name
  }
}
    `;

/**
 * __useSemestersQuery__
 *
 * To run a query within a React component, call `useSemestersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemestersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSemestersQuery({
 *   variables: {
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useSemestersQuery(baseOptions: Apollo.QueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, options);
      }
export function useSemestersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, options);
        }
export type SemestersQueryHookResult = ReturnType<typeof useSemestersQuery>;
export type SemestersLazyQueryHookResult = ReturnType<typeof useSemestersLazyQuery>;
export type SemestersQueryResult = Apollo.QueryResult<SemestersQuery, SemestersQueryVariables>;
export const CoursesDocument = gql`
    query Courses {
  courses {
    id
    name
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const StudentCreationFacultiesDocument = gql`
    query StudentCreationFaculties {
  faculties {
    id
    name
  }
}
    `;

/**
 * __useStudentCreationFacultiesQuery__
 *
 * To run a query within a React component, call `useStudentCreationFacultiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCreationFacultiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCreationFacultiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentCreationFacultiesQuery(baseOptions?: Apollo.QueryHookOptions<StudentCreationFacultiesQuery, StudentCreationFacultiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentCreationFacultiesQuery, StudentCreationFacultiesQueryVariables>(StudentCreationFacultiesDocument, options);
      }
export function useStudentCreationFacultiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentCreationFacultiesQuery, StudentCreationFacultiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentCreationFacultiesQuery, StudentCreationFacultiesQueryVariables>(StudentCreationFacultiesDocument, options);
        }
export type StudentCreationFacultiesQueryHookResult = ReturnType<typeof useStudentCreationFacultiesQuery>;
export type StudentCreationFacultiesLazyQueryHookResult = ReturnType<typeof useStudentCreationFacultiesLazyQuery>;
export type StudentCreationFacultiesQueryResult = Apollo.QueryResult<StudentCreationFacultiesQuery, StudentCreationFacultiesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PaginatedStudentsDocument = gql`
    query PaginatedStudents($pageIndex: Int, $take: Int, $studentId: String) {
  paginatedStudents(pageIndex: $pageIndex, take: $take, studentId: $studentId) {
    totalCount
    students {
      ...studentInfo
    }
  }
}
    ${StudentInfoFragmentDoc}`;

/**
 * __usePaginatedStudentsQuery__
 *
 * To run a query within a React component, call `usePaginatedStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedStudentsQuery({
 *   variables: {
 *      pageIndex: // value for 'pageIndex'
 *      take: // value for 'take'
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function usePaginatedStudentsQuery(baseOptions?: Apollo.QueryHookOptions<PaginatedStudentsQuery, PaginatedStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedStudentsQuery, PaginatedStudentsQueryVariables>(PaginatedStudentsDocument, options);
      }
export function usePaginatedStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedStudentsQuery, PaginatedStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedStudentsQuery, PaginatedStudentsQueryVariables>(PaginatedStudentsDocument, options);
        }
export type PaginatedStudentsQueryHookResult = ReturnType<typeof usePaginatedStudentsQuery>;
export type PaginatedStudentsLazyQueryHookResult = ReturnType<typeof usePaginatedStudentsLazyQuery>;
export type PaginatedStudentsQueryResult = Apollo.QueryResult<PaginatedStudentsQuery, PaginatedStudentsQueryVariables>;
export const TrainingFieldsDocument = gql`
    query TrainingFields {
  trainingFields {
    id
    name
    faculty {
      id
      name
      classes {
        id
        name
      }
    }
    trainingSystem {
      id
      name
    }
    trainingType {
      id
      name
    }
    courses {
      id
      name
    }
    trainingFieldToProgramToCourse {
      course {
        id
        name
      }
      trainingProgram {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useTrainingFieldsQuery__
 *
 * To run a query within a React component, call `useTrainingFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrainingFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrainingFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTrainingFieldsQuery(baseOptions?: Apollo.QueryHookOptions<TrainingFieldsQuery, TrainingFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrainingFieldsQuery, TrainingFieldsQueryVariables>(TrainingFieldsDocument, options);
      }
export function useTrainingFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainingFieldsQuery, TrainingFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrainingFieldsQuery, TrainingFieldsQueryVariables>(TrainingFieldsDocument, options);
        }
export type TrainingFieldsQueryHookResult = ReturnType<typeof useTrainingFieldsQuery>;
export type TrainingFieldsLazyQueryHookResult = ReturnType<typeof useTrainingFieldsLazyQuery>;
export type TrainingFieldsQueryResult = Apollo.QueryResult<TrainingFieldsQuery, TrainingFieldsQueryVariables>;