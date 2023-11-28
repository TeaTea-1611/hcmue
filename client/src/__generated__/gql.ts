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
};

export type Class = {
  __typename?: 'Class';
  academicAdvisor: Lecturer;
  course: Course;
  faculty: Faculty;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ClassMutationResponse = IMutationResponse & {
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

export type CourseMutationResponse = IMutationResponse & {
  __typename?: 'CourseMutationResponse';
  course?: Maybe<Course>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateClassInput = {
  academicAdvisorId: Scalars['String']['input'];
  courseId: Scalars['Int']['input'];
  facultyId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateCourseInput = {
  name: Scalars['String']['input'];
};

export type CreateEducationalFieldInput = {
  educationalSystemId: Scalars['Int']['input'];
  facultyId: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEducationalProgramInput = {
  courseId: Scalars['Int']['input'];
  educationalFieldId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEducationalSystemInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateFacultyInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
};

export type CreateLecturerAndAccountInput = {
  address: Scalars['String']['input'];
  bankAccountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  citizenIdentification: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  district: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  ethnicity: Scalars['String']['input'];
  facultyId: Scalars['Int']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  joinDate: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
  partyMembershipStatus: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permanentAddress: Scalars['String']['input'];
  pob: Scalars['String']['input'];
  priorityArea: Scalars['String']['input'];
  region: Scalars['String']['input'];
  religion: Scalars['String']['input'];
  targetGroup: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateStudentAndAccountInput = {
  address: Scalars['String']['input'];
  bankAccountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  citizenIdentification: Scalars['String']['input'];
  city: Scalars['String']['input'];
  classId: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  courseId: Scalars['Int']['input'];
  district: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  educationalFieldId: Scalars['String']['input'];
  educationalProgramIds: Array<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  enrollmentStatus: Scalars['String']['input'];
  ethnicity: Scalars['String']['input'];
  facultyId: Scalars['Int']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  joinDate: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
  partyMembershipStatus: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permanentAddress: Scalars['String']['input'];
  pob: Scalars['String']['input'];
  position: Scalars['String']['input'];
  priorityArea: Scalars['String']['input'];
  region: Scalars['String']['input'];
  registrations: Scalars['String']['input'];
  religion: Scalars['String']['input'];
  studentType: Scalars['String']['input'];
  targetGroup: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type EducationalField = {
  __typename?: 'EducationalField';
  educationalSystem: EducationalSystem;
  faculty: Faculty;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type EducationalFieldMutationResponse = IMutationResponse & {
  __typename?: 'EducationalFieldMutationResponse';
  educationalField?: Maybe<EducationalField>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EducationalProgram = {
  __typename?: 'EducationalProgram';
  course: Course;
  educationalField: EducationalField;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type EducationalProgramMutationResponse = IMutationResponse & {
  __typename?: 'EducationalProgramMutationResponse';
  educationalProgram?: Maybe<EducationalProgram>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EducationalSystem = {
  __typename?: 'EducationalSystem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EducationalSystemMutationResponse = IMutationResponse & {
  __typename?: 'EducationalSystemMutationResponse';
  educationalSystem?: Maybe<EducationalSystem>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Faculty = {
  __typename?: 'Faculty';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
};

export type FacultyMutationResponse = IMutationResponse & {
  __typename?: 'FacultyMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  faculty?: Maybe<Faculty>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type IMutationResponse = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Lecturer = {
  __typename?: 'Lecturer';
  address: Scalars['String']['output'];
  bankAccountNumber: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  citizenIdentification: Scalars['String']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  district: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  ethnicity: Scalars['String']['output'];
  faculty: Faculty;
  fullName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  joinDate: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
  partyMembershipStatus: Scalars['String']['output'];
  permanentAddress: Scalars['String']['output'];
  pob: Scalars['String']['output'];
  priorityArea: Scalars['String']['output'];
  region: Scalars['String']['output'];
  religion: Scalars['String']['output'];
  targetGroup: Scalars['String']['output'];
  user: User;
};

export type LecturerMutationResponse = IMutationResponse & {
  __typename?: 'LecturerMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  lecturer?: Maybe<Lecturer>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginMutationResponse = IMutationResponse & {
  __typename?: 'LoginMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: ClassMutationResponse;
  createCourse: CourseMutationResponse;
  createEducationalField: EducationalFieldMutationResponse;
  createEducationalProgram: EducationalProgramMutationResponse;
  createEducationalSystem: EducationalSystemMutationResponse;
  createFaculty: FacultyMutationResponse;
  createLecturer: LecturerMutationResponse;
  createStudent: StudentMutationResponse;
  login: LoginMutationResponse;
  logout: Scalars['Boolean']['output'];
  removeClass: MutationResponse;
  removeCourse: MutationResponse;
  removeEducationalField: MutationResponse;
  removeEducationalProgram: MutationResponse;
  removeEducationalSystem: MutationResponse;
  removeFaculty: MutationResponse;
  removeLecturer: MutationResponse;
  removeStudent: MutationResponse;
  updateClass: ClassMutationResponse;
  updateCourse: CourseMutationResponse;
  updateEducationalField: EducationalFieldMutationResponse;
  updateEducationalProgram: EducationalProgramMutationResponse;
  updateEducationalSystem: EducationalSystemMutationResponse;
  updateFaculty: FacultyMutationResponse;
  updateLecturer: LecturerMutationResponse;
  updateStudent: StudentMutationResponse;
};


export type MutationCreateClassArgs = {
  createClassInput: CreateClassInput;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateEducationalFieldArgs = {
  createEducationalFieldInput: CreateEducationalFieldInput;
};


export type MutationCreateEducationalProgramArgs = {
  createEducationalProgramInput: CreateEducationalProgramInput;
};


export type MutationCreateEducationalSystemArgs = {
  createEducationalSystemInput: CreateEducationalSystemInput;
};


export type MutationCreateFacultyArgs = {
  createFacultyInput: CreateFacultyInput;
};


export type MutationCreateLecturerArgs = {
  createLecturerInput: CreateLecturerAndAccountInput;
};


export type MutationCreateStudentArgs = {
  createStudentInput: CreateStudentAndAccountInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveClassArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveEducationalFieldArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveEducationalProgramArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveEducationalSystemArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveFacultyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveLecturerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveStudentArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateClassArgs = {
  updateClassInput: UpdateClassInput;
};


export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateEducationalFieldArgs = {
  updateEducationalFieldInput: UpdateEducationalFieldInput;
};


export type MutationUpdateEducationalProgramArgs = {
  updateEducationalProgramInput: UpdateEducationalProgramInput;
};


export type MutationUpdateEducationalSystemArgs = {
  updateEducationalSystemInput: UpdateEducationalSystemInput;
};


export type MutationUpdateFacultyArgs = {
  updateFacultyInput: UpdateFacultyInput;
};


export type MutationUpdateLecturerArgs = {
  updateLecturerInput: UpdateLecturerInput;
};


export type MutationUpdateStudentArgs = {
  updateStudentInput: UpdateStudentInput;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  class?: Maybe<Class>;
  classes: Array<Class>;
  course?: Maybe<Course>;
  courses: Array<Course>;
  educationalField?: Maybe<EducationalField>;
  educationalFields: Array<EducationalField>;
  educationalProgram?: Maybe<EducationalProgram>;
  educationalPrograms: Array<EducationalProgram>;
  educationalSystem?: Maybe<EducationalSystem>;
  educationalSystems: Array<EducationalSystem>;
  faculties: Array<Faculty>;
  faculty?: Maybe<Faculty>;
  lecturer?: Maybe<Lecturer>;
  lecturers: Array<Lecturer>;
  me?: Maybe<User>;
  student?: Maybe<Student>;
  students: StudentPaginatedResponse;
};


export type QueryClassArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryEducationalFieldArgs = {
  id: Scalars['String']['input'];
};


export type QueryEducationalProgramArgs = {
  id: Scalars['String']['input'];
};


export type QueryEducationalSystemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFacultyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLecturerArgs = {
  id: Scalars['String']['input'];
};


export type QueryStudentArgs = {
  id: Scalars['String']['input'];
};


export type QueryStudentsArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  pageIndex?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Student = {
  __typename?: 'Student';
  address: Scalars['String']['output'];
  bankAccountNumber: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  citizenIdentification: Scalars['String']['output'];
  city: Scalars['String']['output'];
  class: Class;
  country: Scalars['String']['output'];
  course: Course;
  district: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  educationalField: EducationalField;
  educationalPrograms: Array<EducationalProgram>;
  email: Scalars['String']['output'];
  enrollmentStatus: Scalars['String']['output'];
  ethnicity: Scalars['String']['output'];
  faculty: Faculty;
  fullName: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  joinDate: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
  partyMembershipStatus: Scalars['String']['output'];
  permanentAddress: Scalars['String']['output'];
  pob: Scalars['String']['output'];
  position: Scalars['String']['output'];
  priorityArea: Scalars['String']['output'];
  region: Scalars['String']['output'];
  registrations: Scalars['String']['output'];
  religion: Scalars['String']['output'];
  studentType: Scalars['String']['output'];
  targetGroup: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type StudentMutationResponse = IMutationResponse & {
  __typename?: 'StudentMutationResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  success: Scalars['Boolean']['output'];
};

export type StudentPaginatedResponse = {
  __typename?: 'StudentPaginatedResponse';
  students: Array<Student>;
  totalCount: Scalars['Int']['output'];
};

export type UpdateClassInput = {
  academicAdvisorId: Scalars['String']['input'];
  courseId: Scalars['Int']['input'];
  facultyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateCourseInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateEducationalFieldInput = {
  educationalSystemId: Scalars['Int']['input'];
  facultyId: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateEducationalProgramInput = {
  courseId: Scalars['Int']['input'];
  educationalFieldId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateEducationalSystemInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateFacultyInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
};

export type UpdateLecturerInput = {
  address: Scalars['String']['input'];
  bankAccountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  citizenIdentification: Scalars['String']['input'];
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  district: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  ethnicity: Scalars['String']['input'];
  facultyId: Scalars['Int']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  joinDate: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
  partyMembershipStatus: Scalars['String']['input'];
  permanentAddress: Scalars['String']['input'];
  pob: Scalars['String']['input'];
  priorityArea: Scalars['String']['input'];
  region: Scalars['String']['input'];
  religion: Scalars['String']['input'];
  targetGroup: Scalars['String']['input'];
};

export type UpdateStudentInput = {
  address: Scalars['String']['input'];
  bankAccountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  citizenIdentification: Scalars['String']['input'];
  city: Scalars['String']['input'];
  classId: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  courseId: Scalars['Int']['input'];
  district: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  educationalFieldId: Scalars['String']['input'];
  educationalProgramIds: Array<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  enrollmentStatus: Scalars['String']['input'];
  ethnicity: Scalars['String']['input'];
  facultyId: Scalars['Int']['input'];
  fullName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  joinDate: Scalars['String']['input'];
  numberPhone: Scalars['String']['input'];
  partyMembershipStatus: Scalars['String']['input'];
  permanentAddress: Scalars['String']['input'];
  pob: Scalars['String']['input'];
  position: Scalars['String']['input'];
  priorityArea: Scalars['String']['input'];
  region: Scalars['String']['input'];
  registrations: Scalars['String']['input'];
  religion: Scalars['String']['input'];
  studentType: Scalars['String']['input'];
  targetGroup: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type ClassFragment = { __typename?: 'Class', id: string, name: string, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, academicAdvisor: { __typename?: 'Lecturer', id: string, fullName: string } };

export type CourseFragment = { __typename?: 'Course', id: string, name: string };

export type EducationalFieldFragment = { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } };

export type EducationalProgramFragment = { __typename?: 'EducationalProgram', id: string, name: string, educationalField: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }, course: { __typename?: 'Course', id: string, name: string } };

export type EducationalSystemFragment = { __typename?: 'EducationalSystem', id: string, name: string, type: string };

export type FacultyFragment = { __typename?: 'Faculty', id: string, name: string, email: string, address: string, numberPhone: string };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type LecturerFragment = { __typename?: 'Lecturer', id: string, fullName: string, dob: string, pob: string, gender: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, user: { __typename?: 'User', id: string, username: string }, faculty: { __typename?: 'Faculty', id: string, name: string } };

export type StudentFragment = { __typename?: 'Student', id: string, fullName: string, dob: string, pob: string, gender: string, position: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, studentType: string, enrollmentStatus: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, registrations: string, user?: { __typename?: 'User', id: string, username: string } | null, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, class: { __typename?: 'Class', id: string, name: string }, educationalField: { __typename?: 'EducationalField', id: string, name: string }, educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string }> };

export type UserFragment = { __typename?: 'User', id: string, role: string, username: string };

export type CreateClassMutationVariables = Exact<{
  createClassInput: CreateClassInput;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'ClassMutationResponse', success: boolean, message?: string | null, class?: { __typename?: 'Class', id: string, name: string, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, academicAdvisor: { __typename?: 'Lecturer', id: string, fullName: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateClassMutationVariables = Exact<{
  updateClassInput: UpdateClassInput;
}>;


export type UpdateClassMutation = { __typename?: 'Mutation', updateClass: { __typename?: 'ClassMutationResponse', success: boolean, message?: string | null, class?: { __typename?: 'Class', id: string, name: string, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, academicAdvisor: { __typename?: 'Lecturer', id: string, fullName: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveClassMutationVariables = Exact<{
  removeClassId: Scalars['Int']['input'];
}>;


export type RemoveClassMutation = { __typename?: 'Mutation', removeClass: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateCourseMutationVariables = Exact<{
  createCourseInput: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'CourseMutationResponse', success: boolean, message?: string | null, course?: { __typename?: 'Course', id: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCourseMutationVariables = Exact<{
  updateCourseInput: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'CourseMutationResponse', success: boolean, message?: string | null, course?: { __typename?: 'Course', id: string, name: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveCourseMutationVariables = Exact<{
  removeCourseId: Scalars['Int']['input'];
}>;


export type RemoveCourseMutation = { __typename?: 'Mutation', removeCourse: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateEducationalFieldMutationVariables = Exact<{
  createEducationalFieldInput: CreateEducationalFieldInput;
}>;


export type CreateEducationalFieldMutation = { __typename?: 'Mutation', createEducationalField: { __typename?: 'EducationalFieldMutationResponse', success: boolean, message?: string | null, educationalField?: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateEducationalFieldMutationVariables = Exact<{
  updateEducationalFieldInput: UpdateEducationalFieldInput;
}>;


export type UpdateEducationalFieldMutation = { __typename?: 'Mutation', updateEducationalField: { __typename?: 'EducationalFieldMutationResponse', success: boolean, message?: string | null, educationalField?: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveEducationalFieldMutationVariables = Exact<{
  removeEducationalFieldId: Scalars['String']['input'];
}>;


export type RemoveEducationalFieldMutation = { __typename?: 'Mutation', removeEducationalField: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateEducationalProgramMutationVariables = Exact<{
  createEducationalProgramInput: CreateEducationalProgramInput;
}>;


export type CreateEducationalProgramMutation = { __typename?: 'Mutation', createEducationalProgram: { __typename?: 'EducationalProgramMutationResponse', success: boolean, message?: string | null, educationalProgram?: { __typename?: 'EducationalProgram', id: string, name: string, educationalField: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }, course: { __typename?: 'Course', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateEducationalProgramMutationVariables = Exact<{
  updateEducationalProgramInput: UpdateEducationalProgramInput;
}>;


export type UpdateEducationalProgramMutation = { __typename?: 'Mutation', updateEducationalProgram: { __typename?: 'EducationalProgramMutationResponse', success: boolean, message?: string | null, educationalProgram?: { __typename?: 'EducationalProgram', id: string, name: string, educationalField: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }, course: { __typename?: 'Course', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveEducationalProgramMutationVariables = Exact<{
  removeEducationalProgramId: Scalars['String']['input'];
}>;


export type RemoveEducationalProgramMutation = { __typename?: 'Mutation', removeEducationalProgram: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateEducationalSystemMutationVariables = Exact<{
  createEducationalSystemInput: CreateEducationalSystemInput;
}>;


export type CreateEducationalSystemMutation = { __typename?: 'Mutation', createEducationalSystem: { __typename?: 'EducationalSystemMutationResponse', success: boolean, message?: string | null, educationalSystem?: { __typename?: 'EducationalSystem', id: string, name: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateEducationalSystemMutationVariables = Exact<{
  updateEducationalSystemInput: UpdateEducationalSystemInput;
}>;


export type UpdateEducationalSystemMutation = { __typename?: 'Mutation', updateEducationalSystem: { __typename?: 'EducationalSystemMutationResponse', success: boolean, message?: string | null, educationalSystem?: { __typename?: 'EducationalSystem', id: string, name: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveEducationalSystemMutationVariables = Exact<{
  removeEducationalSystemId: Scalars['Int']['input'];
}>;


export type RemoveEducationalSystemMutation = { __typename?: 'Mutation', removeEducationalSystem: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateFacultyMutationVariables = Exact<{
  createFacultyInput: CreateFacultyInput;
}>;


export type CreateFacultyMutation = { __typename?: 'Mutation', createFaculty: { __typename?: 'FacultyMutationResponse', success: boolean, message?: string | null, faculty?: { __typename?: 'Faculty', id: string, name: string, email: string, address: string, numberPhone: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateFacultyMutationVariables = Exact<{
  updateFacultyInput: UpdateFacultyInput;
}>;


export type UpdateFacultyMutation = { __typename?: 'Mutation', updateFaculty: { __typename?: 'FacultyMutationResponse', success: boolean, message?: string | null, faculty?: { __typename?: 'Faculty', id: string, name: string, email: string, address: string, numberPhone: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveFacultyMutationVariables = Exact<{
  removeFacultyId: Scalars['Int']['input'];
}>;


export type RemoveFacultyMutation = { __typename?: 'Mutation', removeFaculty: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type CreateLecturerMutationVariables = Exact<{
  createLecturerInput: CreateLecturerAndAccountInput;
}>;


export type CreateLecturerMutation = { __typename?: 'Mutation', createLecturer: { __typename?: 'LecturerMutationResponse', success: boolean, message?: string | null, lecturer?: { __typename?: 'Lecturer', id: string, fullName: string, dob: string, pob: string, gender: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, user: { __typename?: 'User', id: string, username: string }, faculty: { __typename?: 'Faculty', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateLecturerMutationVariables = Exact<{
  updateLecturerInput: UpdateLecturerInput;
}>;


export type UpdateLecturerMutation = { __typename?: 'Mutation', updateLecturer: { __typename?: 'LecturerMutationResponse', success: boolean, message?: string | null, lecturer?: { __typename?: 'Lecturer', id: string, fullName: string, dob: string, pob: string, gender: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, user: { __typename?: 'User', id: string, username: string }, faculty: { __typename?: 'Faculty', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveLecturerMutationVariables = Exact<{
  removeLecturerId: Scalars['String']['input'];
}>;


export type RemoveLecturerMutation = { __typename?: 'Mutation', removeLecturer: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginMutationResponse', success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, role: string, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateStudentMutationVariables = Exact<{
  createStudentInput: CreateStudentAndAccountInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'StudentMutationResponse', success: boolean, message?: string | null, student?: { __typename?: 'Student', id: string, fullName: string, dob: string, pob: string, gender: string, position: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, studentType: string, enrollmentStatus: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, registrations: string, user?: { __typename?: 'User', id: string, username: string } | null, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, class: { __typename?: 'Class', id: string, name: string }, educationalField: { __typename?: 'EducationalField', id: string, name: string }, educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateStudentMutationVariables = Exact<{
  updateStudentInput: UpdateStudentInput;
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'StudentMutationResponse', success: boolean, message?: string | null, student?: { __typename?: 'Student', id: string, fullName: string, dob: string, pob: string, gender: string, position: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, studentType: string, enrollmentStatus: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, registrations: string, user?: { __typename?: 'User', id: string, username: string } | null, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, class: { __typename?: 'Class', id: string, name: string }, educationalField: { __typename?: 'EducationalField', id: string, name: string }, educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string }> } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RemoveStudentMutationVariables = Exact<{
  removeStudentId: Scalars['String']['input'];
}>;


export type RemoveStudentMutation = { __typename?: 'Mutation', removeStudent: { __typename?: 'MutationResponse', success: boolean, message?: string | null } };

export type ClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassesQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', id: string, name: string, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, academicAdvisor: { __typename?: 'Lecturer', id: string, fullName: string } }> };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', courses: Array<{ __typename?: 'Course', id: string, name: string }> };

export type EducationalFieldsQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationalFieldsQuery = { __typename?: 'Query', educationalFields: Array<{ __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }> };

export type EducationalProgramsQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationalProgramsQuery = { __typename?: 'Query', educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string, educationalField: { __typename?: 'EducationalField', id: string, name: string, educationalSystem: { __typename?: 'EducationalSystem', id: string, name: string, type: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }, course: { __typename?: 'Course', id: string, name: string } }> };

export type EducationalSystemsQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationalSystemsQuery = { __typename?: 'Query', educationalSystems: Array<{ __typename?: 'EducationalSystem', id: string, name: string, type: string }> };

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = { __typename?: 'Query', faculties: Array<{ __typename?: 'Faculty', id: string, name: string, email: string, address: string, numberPhone: string }> };

export type LecturersQueryVariables = Exact<{ [key: string]: never; }>;


export type LecturersQuery = { __typename?: 'Query', lecturers: Array<{ __typename?: 'Lecturer', id: string, fullName: string, dob: string, pob: string, gender: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, user: { __typename?: 'User', id: string, username: string }, faculty: { __typename?: 'Faculty', id: string, name: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, role: string, username: string } | null };

export type StudentsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  pageIndex?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StudentsQuery = { __typename?: 'Query', students: { __typename?: 'StudentPaginatedResponse', totalCount: number, students: Array<{ __typename?: 'Student', id: string, fullName: string, dob: string, pob: string, gender: string, position: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, studentType: string, enrollmentStatus: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, registrations: string, user?: { __typename?: 'User', id: string, username: string } | null, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, class: { __typename?: 'Class', id: string, name: string }, educationalField: { __typename?: 'EducationalField', id: string, name: string }, educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string }> }> } };

export type StudentQueryVariables = Exact<{
  studentId: Scalars['String']['input'];
}>;


export type StudentQuery = { __typename?: 'Query', student?: { __typename?: 'Student', id: string, fullName: string, dob: string, pob: string, gender: string, position: string, ethnicity: string, citizenIdentification: string, religion: string, targetGroup: string, region: string, priorityArea: string, partyMembershipStatus: string, joinDate: string, studentType: string, enrollmentStatus: string, city: string, district: string, country: string, permanentAddress: string, numberPhone: string, email: string, address: string, bankAccountNumber: string, bankName: string, registrations: string, user?: { __typename?: 'User', id: string, username: string } | null, faculty: { __typename?: 'Faculty', id: string, name: string }, course: { __typename?: 'Course', id: string, name: string }, class: { __typename?: 'Class', id: string, name: string }, educationalField: { __typename?: 'EducationalField', id: string, name: string }, educationalPrograms: Array<{ __typename?: 'EducationalProgram', id: string, name: string }> } | null };

export const ClassFragmentDoc = gql`
    fragment class on Class {
  id
  name
  faculty {
    id
    name
  }
  course {
    id
    name
  }
  academicAdvisor {
    id
    fullName
  }
}
    `;
export const CourseFragmentDoc = gql`
    fragment course on Course {
  id
  name
}
    `;
export const EducationalFieldFragmentDoc = gql`
    fragment educationalField on EducationalField {
  id
  name
  educationalSystem {
    id
    name
    type
  }
  faculty {
    id
    name
  }
}
    `;
export const EducationalProgramFragmentDoc = gql`
    fragment educationalProgram on EducationalProgram {
  id
  name
  educationalField {
    id
    name
    educationalSystem {
      id
      name
      type
    }
    faculty {
      id
      name
    }
  }
  course {
    id
    name
  }
}
    `;
export const EducationalSystemFragmentDoc = gql`
    fragment educationalSystem on EducationalSystem {
  id
  name
  type
}
    `;
export const FacultyFragmentDoc = gql`
    fragment faculty on Faculty {
  id
  name
  email
  address
  numberPhone
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const LecturerFragmentDoc = gql`
    fragment lecturer on Lecturer {
  id
  fullName
  dob
  pob
  gender
  ethnicity
  citizenIdentification
  religion
  targetGroup
  region
  priorityArea
  partyMembershipStatus
  joinDate
  city
  district
  country
  permanentAddress
  numberPhone
  email
  address
  bankAccountNumber
  bankName
  user {
    id
    username
  }
  faculty {
    id
    name
  }
}
    `;
export const StudentFragmentDoc = gql`
    fragment student on Student {
  id
  fullName
  dob
  pob
  gender
  position
  ethnicity
  citizenIdentification
  religion
  targetGroup
  region
  priorityArea
  partyMembershipStatus
  joinDate
  studentType
  enrollmentStatus
  city
  district
  country
  permanentAddress
  numberPhone
  email
  address
  bankAccountNumber
  bankName
  registrations
  user {
    id
    username
  }
  faculty {
    id
    name
  }
  course {
    id
    name
  }
  class {
    id
    name
  }
  educationalField {
    id
    name
  }
  educationalPrograms {
    id
    name
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  role
  username
}
    `;
export const CreateClassDocument = gql`
    mutation CreateClass($createClassInput: CreateClassInput!) {
  createClass(createClassInput: $createClassInput) {
    success
    message
    class {
      ...class
    }
    errors {
      ...fieldError
    }
  }
}
    ${ClassFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateClassMutationFn = Apollo.MutationFunction<CreateClassMutation, CreateClassMutationVariables>;

/**
 * __useCreateClassMutation__
 *
 * To run a mutation, you first call `useCreateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassMutation, { data, loading, error }] = useCreateClassMutation({
 *   variables: {
 *      createClassInput: // value for 'createClassInput'
 *   },
 * });
 */
export function useCreateClassMutation(baseOptions?: Apollo.MutationHookOptions<CreateClassMutation, CreateClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClassMutation, CreateClassMutationVariables>(CreateClassDocument, options);
      }
export type CreateClassMutationHookResult = ReturnType<typeof useCreateClassMutation>;
export type CreateClassMutationResult = Apollo.MutationResult<CreateClassMutation>;
export type CreateClassMutationOptions = Apollo.BaseMutationOptions<CreateClassMutation, CreateClassMutationVariables>;
export const UpdateClassDocument = gql`
    mutation UpdateClass($updateClassInput: UpdateClassInput!) {
  updateClass(updateClassInput: $updateClassInput) {
    success
    message
    class {
      ...class
    }
    errors {
      ...fieldError
    }
  }
}
    ${ClassFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateClassMutationFn = Apollo.MutationFunction<UpdateClassMutation, UpdateClassMutationVariables>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      updateClassInput: // value for 'updateClassInput'
 *   },
 * });
 */
export function useUpdateClassMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClassMutation, UpdateClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(UpdateClassDocument, options);
      }
export type UpdateClassMutationHookResult = ReturnType<typeof useUpdateClassMutation>;
export type UpdateClassMutationResult = Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<UpdateClassMutation, UpdateClassMutationVariables>;
export const RemoveClassDocument = gql`
    mutation RemoveClass($removeClassId: Int!) {
  removeClass(id: $removeClassId) {
    success
    message
  }
}
    `;
export type RemoveClassMutationFn = Apollo.MutationFunction<RemoveClassMutation, RemoveClassMutationVariables>;

/**
 * __useRemoveClassMutation__
 *
 * To run a mutation, you first call `useRemoveClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClassMutation, { data, loading, error }] = useRemoveClassMutation({
 *   variables: {
 *      removeClassId: // value for 'removeClassId'
 *   },
 * });
 */
export function useRemoveClassMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClassMutation, RemoveClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClassMutation, RemoveClassMutationVariables>(RemoveClassDocument, options);
      }
export type RemoveClassMutationHookResult = ReturnType<typeof useRemoveClassMutation>;
export type RemoveClassMutationResult = Apollo.MutationResult<RemoveClassMutation>;
export type RemoveClassMutationOptions = Apollo.BaseMutationOptions<RemoveClassMutation, RemoveClassMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($createCourseInput: CreateCourseInput!) {
  createCourse(createCourseInput: $createCourseInput) {
    success
    message
    course {
      ...course
    }
    errors {
      ...fieldError
    }
  }
}
    ${CourseFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      createCourseInput: // value for 'createCourseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($updateCourseInput: UpdateCourseInput!) {
  updateCourse(updateCourseInput: $updateCourseInput) {
    success
    message
    course {
      ...course
    }
    errors {
      ...fieldError
    }
  }
}
    ${CourseFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      updateCourseInput: // value for 'updateCourseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const RemoveCourseDocument = gql`
    mutation RemoveCourse($removeCourseId: Int!) {
  removeCourse(id: $removeCourseId) {
    success
    message
  }
}
    `;
export type RemoveCourseMutationFn = Apollo.MutationFunction<RemoveCourseMutation, RemoveCourseMutationVariables>;

/**
 * __useRemoveCourseMutation__
 *
 * To run a mutation, you first call `useRemoveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemoveCourseMutation({
 *   variables: {
 *      removeCourseId: // value for 'removeCourseId'
 *   },
 * });
 */
export function useRemoveCourseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseMutation, RemoveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(RemoveCourseDocument, options);
      }
export type RemoveCourseMutationHookResult = ReturnType<typeof useRemoveCourseMutation>;
export type RemoveCourseMutationResult = Apollo.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = Apollo.BaseMutationOptions<RemoveCourseMutation, RemoveCourseMutationVariables>;
export const CreateEducationalFieldDocument = gql`
    mutation CreateEducationalField($createEducationalFieldInput: CreateEducationalFieldInput!) {
  createEducationalField(
    createEducationalFieldInput: $createEducationalFieldInput
  ) {
    success
    message
    educationalField {
      ...educationalField
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalFieldFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateEducationalFieldMutationFn = Apollo.MutationFunction<CreateEducationalFieldMutation, CreateEducationalFieldMutationVariables>;

/**
 * __useCreateEducationalFieldMutation__
 *
 * To run a mutation, you first call `useCreateEducationalFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationalFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationalFieldMutation, { data, loading, error }] = useCreateEducationalFieldMutation({
 *   variables: {
 *      createEducationalFieldInput: // value for 'createEducationalFieldInput'
 *   },
 * });
 */
export function useCreateEducationalFieldMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationalFieldMutation, CreateEducationalFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEducationalFieldMutation, CreateEducationalFieldMutationVariables>(CreateEducationalFieldDocument, options);
      }
export type CreateEducationalFieldMutationHookResult = ReturnType<typeof useCreateEducationalFieldMutation>;
export type CreateEducationalFieldMutationResult = Apollo.MutationResult<CreateEducationalFieldMutation>;
export type CreateEducationalFieldMutationOptions = Apollo.BaseMutationOptions<CreateEducationalFieldMutation, CreateEducationalFieldMutationVariables>;
export const UpdateEducationalFieldDocument = gql`
    mutation UpdateEducationalField($updateEducationalFieldInput: UpdateEducationalFieldInput!) {
  updateEducationalField(
    updateEducationalFieldInput: $updateEducationalFieldInput
  ) {
    success
    message
    educationalField {
      ...educationalField
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalFieldFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateEducationalFieldMutationFn = Apollo.MutationFunction<UpdateEducationalFieldMutation, UpdateEducationalFieldMutationVariables>;

/**
 * __useUpdateEducationalFieldMutation__
 *
 * To run a mutation, you first call `useUpdateEducationalFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationalFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationalFieldMutation, { data, loading, error }] = useUpdateEducationalFieldMutation({
 *   variables: {
 *      updateEducationalFieldInput: // value for 'updateEducationalFieldInput'
 *   },
 * });
 */
export function useUpdateEducationalFieldMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationalFieldMutation, UpdateEducationalFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEducationalFieldMutation, UpdateEducationalFieldMutationVariables>(UpdateEducationalFieldDocument, options);
      }
export type UpdateEducationalFieldMutationHookResult = ReturnType<typeof useUpdateEducationalFieldMutation>;
export type UpdateEducationalFieldMutationResult = Apollo.MutationResult<UpdateEducationalFieldMutation>;
export type UpdateEducationalFieldMutationOptions = Apollo.BaseMutationOptions<UpdateEducationalFieldMutation, UpdateEducationalFieldMutationVariables>;
export const RemoveEducationalFieldDocument = gql`
    mutation RemoveEducationalField($removeEducationalFieldId: String!) {
  removeEducationalField(id: $removeEducationalFieldId) {
    success
    message
  }
}
    `;
export type RemoveEducationalFieldMutationFn = Apollo.MutationFunction<RemoveEducationalFieldMutation, RemoveEducationalFieldMutationVariables>;

/**
 * __useRemoveEducationalFieldMutation__
 *
 * To run a mutation, you first call `useRemoveEducationalFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEducationalFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEducationalFieldMutation, { data, loading, error }] = useRemoveEducationalFieldMutation({
 *   variables: {
 *      removeEducationalFieldId: // value for 'removeEducationalFieldId'
 *   },
 * });
 */
export function useRemoveEducationalFieldMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEducationalFieldMutation, RemoveEducationalFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEducationalFieldMutation, RemoveEducationalFieldMutationVariables>(RemoveEducationalFieldDocument, options);
      }
export type RemoveEducationalFieldMutationHookResult = ReturnType<typeof useRemoveEducationalFieldMutation>;
export type RemoveEducationalFieldMutationResult = Apollo.MutationResult<RemoveEducationalFieldMutation>;
export type RemoveEducationalFieldMutationOptions = Apollo.BaseMutationOptions<RemoveEducationalFieldMutation, RemoveEducationalFieldMutationVariables>;
export const CreateEducationalProgramDocument = gql`
    mutation CreateEducationalProgram($createEducationalProgramInput: CreateEducationalProgramInput!) {
  createEducationalProgram(
    createEducationalProgramInput: $createEducationalProgramInput
  ) {
    success
    message
    educationalProgram {
      ...educationalProgram
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalProgramFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateEducationalProgramMutationFn = Apollo.MutationFunction<CreateEducationalProgramMutation, CreateEducationalProgramMutationVariables>;

/**
 * __useCreateEducationalProgramMutation__
 *
 * To run a mutation, you first call `useCreateEducationalProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationalProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationalProgramMutation, { data, loading, error }] = useCreateEducationalProgramMutation({
 *   variables: {
 *      createEducationalProgramInput: // value for 'createEducationalProgramInput'
 *   },
 * });
 */
export function useCreateEducationalProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationalProgramMutation, CreateEducationalProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEducationalProgramMutation, CreateEducationalProgramMutationVariables>(CreateEducationalProgramDocument, options);
      }
export type CreateEducationalProgramMutationHookResult = ReturnType<typeof useCreateEducationalProgramMutation>;
export type CreateEducationalProgramMutationResult = Apollo.MutationResult<CreateEducationalProgramMutation>;
export type CreateEducationalProgramMutationOptions = Apollo.BaseMutationOptions<CreateEducationalProgramMutation, CreateEducationalProgramMutationVariables>;
export const UpdateEducationalProgramDocument = gql`
    mutation UpdateEducationalProgram($updateEducationalProgramInput: UpdateEducationalProgramInput!) {
  updateEducationalProgram(
    updateEducationalProgramInput: $updateEducationalProgramInput
  ) {
    success
    message
    educationalProgram {
      ...educationalProgram
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalProgramFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateEducationalProgramMutationFn = Apollo.MutationFunction<UpdateEducationalProgramMutation, UpdateEducationalProgramMutationVariables>;

/**
 * __useUpdateEducationalProgramMutation__
 *
 * To run a mutation, you first call `useUpdateEducationalProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationalProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationalProgramMutation, { data, loading, error }] = useUpdateEducationalProgramMutation({
 *   variables: {
 *      updateEducationalProgramInput: // value for 'updateEducationalProgramInput'
 *   },
 * });
 */
export function useUpdateEducationalProgramMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationalProgramMutation, UpdateEducationalProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEducationalProgramMutation, UpdateEducationalProgramMutationVariables>(UpdateEducationalProgramDocument, options);
      }
export type UpdateEducationalProgramMutationHookResult = ReturnType<typeof useUpdateEducationalProgramMutation>;
export type UpdateEducationalProgramMutationResult = Apollo.MutationResult<UpdateEducationalProgramMutation>;
export type UpdateEducationalProgramMutationOptions = Apollo.BaseMutationOptions<UpdateEducationalProgramMutation, UpdateEducationalProgramMutationVariables>;
export const RemoveEducationalProgramDocument = gql`
    mutation RemoveEducationalProgram($removeEducationalProgramId: String!) {
  removeEducationalProgram(id: $removeEducationalProgramId) {
    success
    message
  }
}
    `;
export type RemoveEducationalProgramMutationFn = Apollo.MutationFunction<RemoveEducationalProgramMutation, RemoveEducationalProgramMutationVariables>;

/**
 * __useRemoveEducationalProgramMutation__
 *
 * To run a mutation, you first call `useRemoveEducationalProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEducationalProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEducationalProgramMutation, { data, loading, error }] = useRemoveEducationalProgramMutation({
 *   variables: {
 *      removeEducationalProgramId: // value for 'removeEducationalProgramId'
 *   },
 * });
 */
export function useRemoveEducationalProgramMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEducationalProgramMutation, RemoveEducationalProgramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEducationalProgramMutation, RemoveEducationalProgramMutationVariables>(RemoveEducationalProgramDocument, options);
      }
export type RemoveEducationalProgramMutationHookResult = ReturnType<typeof useRemoveEducationalProgramMutation>;
export type RemoveEducationalProgramMutationResult = Apollo.MutationResult<RemoveEducationalProgramMutation>;
export type RemoveEducationalProgramMutationOptions = Apollo.BaseMutationOptions<RemoveEducationalProgramMutation, RemoveEducationalProgramMutationVariables>;
export const CreateEducationalSystemDocument = gql`
    mutation CreateEducationalSystem($createEducationalSystemInput: CreateEducationalSystemInput!) {
  createEducationalSystem(
    createEducationalSystemInput: $createEducationalSystemInput
  ) {
    success
    message
    educationalSystem {
      ...educationalSystem
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalSystemFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateEducationalSystemMutationFn = Apollo.MutationFunction<CreateEducationalSystemMutation, CreateEducationalSystemMutationVariables>;

/**
 * __useCreateEducationalSystemMutation__
 *
 * To run a mutation, you first call `useCreateEducationalSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEducationalSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEducationalSystemMutation, { data, loading, error }] = useCreateEducationalSystemMutation({
 *   variables: {
 *      createEducationalSystemInput: // value for 'createEducationalSystemInput'
 *   },
 * });
 */
export function useCreateEducationalSystemMutation(baseOptions?: Apollo.MutationHookOptions<CreateEducationalSystemMutation, CreateEducationalSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEducationalSystemMutation, CreateEducationalSystemMutationVariables>(CreateEducationalSystemDocument, options);
      }
export type CreateEducationalSystemMutationHookResult = ReturnType<typeof useCreateEducationalSystemMutation>;
export type CreateEducationalSystemMutationResult = Apollo.MutationResult<CreateEducationalSystemMutation>;
export type CreateEducationalSystemMutationOptions = Apollo.BaseMutationOptions<CreateEducationalSystemMutation, CreateEducationalSystemMutationVariables>;
export const UpdateEducationalSystemDocument = gql`
    mutation UpdateEducationalSystem($updateEducationalSystemInput: UpdateEducationalSystemInput!) {
  updateEducationalSystem(
    updateEducationalSystemInput: $updateEducationalSystemInput
  ) {
    success
    message
    educationalSystem {
      ...educationalSystem
    }
    errors {
      ...fieldError
    }
  }
}
    ${EducationalSystemFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateEducationalSystemMutationFn = Apollo.MutationFunction<UpdateEducationalSystemMutation, UpdateEducationalSystemMutationVariables>;

/**
 * __useUpdateEducationalSystemMutation__
 *
 * To run a mutation, you first call `useUpdateEducationalSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationalSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationalSystemMutation, { data, loading, error }] = useUpdateEducationalSystemMutation({
 *   variables: {
 *      updateEducationalSystemInput: // value for 'updateEducationalSystemInput'
 *   },
 * });
 */
export function useUpdateEducationalSystemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationalSystemMutation, UpdateEducationalSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEducationalSystemMutation, UpdateEducationalSystemMutationVariables>(UpdateEducationalSystemDocument, options);
      }
export type UpdateEducationalSystemMutationHookResult = ReturnType<typeof useUpdateEducationalSystemMutation>;
export type UpdateEducationalSystemMutationResult = Apollo.MutationResult<UpdateEducationalSystemMutation>;
export type UpdateEducationalSystemMutationOptions = Apollo.BaseMutationOptions<UpdateEducationalSystemMutation, UpdateEducationalSystemMutationVariables>;
export const RemoveEducationalSystemDocument = gql`
    mutation RemoveEducationalSystem($removeEducationalSystemId: Int!) {
  removeEducationalSystem(id: $removeEducationalSystemId) {
    success
    message
  }
}
    `;
export type RemoveEducationalSystemMutationFn = Apollo.MutationFunction<RemoveEducationalSystemMutation, RemoveEducationalSystemMutationVariables>;

/**
 * __useRemoveEducationalSystemMutation__
 *
 * To run a mutation, you first call `useRemoveEducationalSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEducationalSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEducationalSystemMutation, { data, loading, error }] = useRemoveEducationalSystemMutation({
 *   variables: {
 *      removeEducationalSystemId: // value for 'removeEducationalSystemId'
 *   },
 * });
 */
export function useRemoveEducationalSystemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEducationalSystemMutation, RemoveEducationalSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEducationalSystemMutation, RemoveEducationalSystemMutationVariables>(RemoveEducationalSystemDocument, options);
      }
export type RemoveEducationalSystemMutationHookResult = ReturnType<typeof useRemoveEducationalSystemMutation>;
export type RemoveEducationalSystemMutationResult = Apollo.MutationResult<RemoveEducationalSystemMutation>;
export type RemoveEducationalSystemMutationOptions = Apollo.BaseMutationOptions<RemoveEducationalSystemMutation, RemoveEducationalSystemMutationVariables>;
export const CreateFacultyDocument = gql`
    mutation CreateFaculty($createFacultyInput: CreateFacultyInput!) {
  createFaculty(createFacultyInput: $createFacultyInput) {
    success
    message
    faculty {
      ...faculty
    }
    errors {
      ...fieldError
    }
  }
}
    ${FacultyFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateFacultyMutationFn = Apollo.MutationFunction<CreateFacultyMutation, CreateFacultyMutationVariables>;

/**
 * __useCreateFacultyMutation__
 *
 * To run a mutation, you first call `useCreateFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFacultyMutation, { data, loading, error }] = useCreateFacultyMutation({
 *   variables: {
 *      createFacultyInput: // value for 'createFacultyInput'
 *   },
 * });
 */
export function useCreateFacultyMutation(baseOptions?: Apollo.MutationHookOptions<CreateFacultyMutation, CreateFacultyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFacultyMutation, CreateFacultyMutationVariables>(CreateFacultyDocument, options);
      }
export type CreateFacultyMutationHookResult = ReturnType<typeof useCreateFacultyMutation>;
export type CreateFacultyMutationResult = Apollo.MutationResult<CreateFacultyMutation>;
export type CreateFacultyMutationOptions = Apollo.BaseMutationOptions<CreateFacultyMutation, CreateFacultyMutationVariables>;
export const UpdateFacultyDocument = gql`
    mutation UpdateFaculty($updateFacultyInput: UpdateFacultyInput!) {
  updateFaculty(updateFacultyInput: $updateFacultyInput) {
    success
    message
    faculty {
      ...faculty
    }
    errors {
      ...fieldError
    }
  }
}
    ${FacultyFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateFacultyMutationFn = Apollo.MutationFunction<UpdateFacultyMutation, UpdateFacultyMutationVariables>;

/**
 * __useUpdateFacultyMutation__
 *
 * To run a mutation, you first call `useUpdateFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFacultyMutation, { data, loading, error }] = useUpdateFacultyMutation({
 *   variables: {
 *      updateFacultyInput: // value for 'updateFacultyInput'
 *   },
 * });
 */
export function useUpdateFacultyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFacultyMutation, UpdateFacultyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFacultyMutation, UpdateFacultyMutationVariables>(UpdateFacultyDocument, options);
      }
export type UpdateFacultyMutationHookResult = ReturnType<typeof useUpdateFacultyMutation>;
export type UpdateFacultyMutationResult = Apollo.MutationResult<UpdateFacultyMutation>;
export type UpdateFacultyMutationOptions = Apollo.BaseMutationOptions<UpdateFacultyMutation, UpdateFacultyMutationVariables>;
export const RemoveFacultyDocument = gql`
    mutation RemoveFaculty($removeFacultyId: Int!) {
  removeFaculty(id: $removeFacultyId) {
    success
    message
  }
}
    `;
export type RemoveFacultyMutationFn = Apollo.MutationFunction<RemoveFacultyMutation, RemoveFacultyMutationVariables>;

/**
 * __useRemoveFacultyMutation__
 *
 * To run a mutation, you first call `useRemoveFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFacultyMutation, { data, loading, error }] = useRemoveFacultyMutation({
 *   variables: {
 *      removeFacultyId: // value for 'removeFacultyId'
 *   },
 * });
 */
export function useRemoveFacultyMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFacultyMutation, RemoveFacultyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFacultyMutation, RemoveFacultyMutationVariables>(RemoveFacultyDocument, options);
      }
export type RemoveFacultyMutationHookResult = ReturnType<typeof useRemoveFacultyMutation>;
export type RemoveFacultyMutationResult = Apollo.MutationResult<RemoveFacultyMutation>;
export type RemoveFacultyMutationOptions = Apollo.BaseMutationOptions<RemoveFacultyMutation, RemoveFacultyMutationVariables>;
export const CreateLecturerDocument = gql`
    mutation CreateLecturer($createLecturerInput: CreateLecturerAndAccountInput!) {
  createLecturer(createLecturerInput: $createLecturerInput) {
    success
    message
    lecturer {
      ...lecturer
    }
    errors {
      ...fieldError
    }
  }
}
    ${LecturerFragmentDoc}
${FieldErrorFragmentDoc}`;
export type CreateLecturerMutationFn = Apollo.MutationFunction<CreateLecturerMutation, CreateLecturerMutationVariables>;

/**
 * __useCreateLecturerMutation__
 *
 * To run a mutation, you first call `useCreateLecturerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLecturerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLecturerMutation, { data, loading, error }] = useCreateLecturerMutation({
 *   variables: {
 *      createLecturerInput: // value for 'createLecturerInput'
 *   },
 * });
 */
export function useCreateLecturerMutation(baseOptions?: Apollo.MutationHookOptions<CreateLecturerMutation, CreateLecturerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLecturerMutation, CreateLecturerMutationVariables>(CreateLecturerDocument, options);
      }
export type CreateLecturerMutationHookResult = ReturnType<typeof useCreateLecturerMutation>;
export type CreateLecturerMutationResult = Apollo.MutationResult<CreateLecturerMutation>;
export type CreateLecturerMutationOptions = Apollo.BaseMutationOptions<CreateLecturerMutation, CreateLecturerMutationVariables>;
export const UpdateLecturerDocument = gql`
    mutation UpdateLecturer($updateLecturerInput: UpdateLecturerInput!) {
  updateLecturer(updateLecturerInput: $updateLecturerInput) {
    success
    message
    lecturer {
      ...lecturer
    }
    errors {
      ...fieldError
    }
  }
}
    ${LecturerFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateLecturerMutationFn = Apollo.MutationFunction<UpdateLecturerMutation, UpdateLecturerMutationVariables>;

/**
 * __useUpdateLecturerMutation__
 *
 * To run a mutation, you first call `useUpdateLecturerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLecturerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLecturerMutation, { data, loading, error }] = useUpdateLecturerMutation({
 *   variables: {
 *      updateLecturerInput: // value for 'updateLecturerInput'
 *   },
 * });
 */
export function useUpdateLecturerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLecturerMutation, UpdateLecturerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLecturerMutation, UpdateLecturerMutationVariables>(UpdateLecturerDocument, options);
      }
export type UpdateLecturerMutationHookResult = ReturnType<typeof useUpdateLecturerMutation>;
export type UpdateLecturerMutationResult = Apollo.MutationResult<UpdateLecturerMutation>;
export type UpdateLecturerMutationOptions = Apollo.BaseMutationOptions<UpdateLecturerMutation, UpdateLecturerMutationVariables>;
export const RemoveLecturerDocument = gql`
    mutation RemoveLecturer($removeLecturerId: String!) {
  removeLecturer(id: $removeLecturerId) {
    success
    message
  }
}
    `;
export type RemoveLecturerMutationFn = Apollo.MutationFunction<RemoveLecturerMutation, RemoveLecturerMutationVariables>;

/**
 * __useRemoveLecturerMutation__
 *
 * To run a mutation, you first call `useRemoveLecturerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLecturerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLecturerMutation, { data, loading, error }] = useRemoveLecturerMutation({
 *   variables: {
 *      removeLecturerId: // value for 'removeLecturerId'
 *   },
 * });
 */
export function useRemoveLecturerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLecturerMutation, RemoveLecturerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLecturerMutation, RemoveLecturerMutationVariables>(RemoveLecturerDocument, options);
      }
export type RemoveLecturerMutationHookResult = ReturnType<typeof useRemoveLecturerMutation>;
export type RemoveLecturerMutationResult = Apollo.MutationResult<RemoveLecturerMutation>;
export type RemoveLecturerMutationOptions = Apollo.BaseMutationOptions<RemoveLecturerMutation, RemoveLecturerMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    success
    message
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;
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
    mutation CreateStudent($createStudentInput: CreateStudentAndAccountInput!) {
  createStudent(createStudentInput: $createStudentInput) {
    success
    message
    student {
      ...student
    }
    errors {
      ...fieldError
    }
  }
}
    ${StudentFragmentDoc}
${FieldErrorFragmentDoc}`;
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
export const UpdateStudentDocument = gql`
    mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {
  updateStudent(updateStudentInput: $updateStudentInput) {
    success
    message
    student {
      ...student
    }
    errors {
      ...fieldError
    }
  }
}
    ${StudentFragmentDoc}
${FieldErrorFragmentDoc}`;
export type UpdateStudentMutationFn = Apollo.MutationFunction<UpdateStudentMutation, UpdateStudentMutationVariables>;

/**
 * __useUpdateStudentMutation__
 *
 * To run a mutation, you first call `useUpdateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentMutation, { data, loading, error }] = useUpdateStudentMutation({
 *   variables: {
 *      updateStudentInput: // value for 'updateStudentInput'
 *   },
 * });
 */
export function useUpdateStudentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentMutation, UpdateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentMutation, UpdateStudentMutationVariables>(UpdateStudentDocument, options);
      }
export type UpdateStudentMutationHookResult = ReturnType<typeof useUpdateStudentMutation>;
export type UpdateStudentMutationResult = Apollo.MutationResult<UpdateStudentMutation>;
export type UpdateStudentMutationOptions = Apollo.BaseMutationOptions<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const RemoveStudentDocument = gql`
    mutation RemoveStudent($removeStudentId: String!) {
  removeStudent(id: $removeStudentId) {
    success
    message
  }
}
    `;
export type RemoveStudentMutationFn = Apollo.MutationFunction<RemoveStudentMutation, RemoveStudentMutationVariables>;

/**
 * __useRemoveStudentMutation__
 *
 * To run a mutation, you first call `useRemoveStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStudentMutation, { data, loading, error }] = useRemoveStudentMutation({
 *   variables: {
 *      removeStudentId: // value for 'removeStudentId'
 *   },
 * });
 */
export function useRemoveStudentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStudentMutation, RemoveStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStudentMutation, RemoveStudentMutationVariables>(RemoveStudentDocument, options);
      }
export type RemoveStudentMutationHookResult = ReturnType<typeof useRemoveStudentMutation>;
export type RemoveStudentMutationResult = Apollo.MutationResult<RemoveStudentMutation>;
export type RemoveStudentMutationOptions = Apollo.BaseMutationOptions<RemoveStudentMutation, RemoveStudentMutationVariables>;
export const ClassesDocument = gql`
    query Classes {
  classes {
    ...class
  }
}
    ${ClassFragmentDoc}`;

/**
 * __useClassesQuery__
 *
 * To run a query within a React component, call `useClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassesQuery(baseOptions?: Apollo.QueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, options);
      }
export function useClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, options);
        }
export function useClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ClassesQuery, ClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClassesQuery, ClassesQueryVariables>(ClassesDocument, options);
        }
export type ClassesQueryHookResult = ReturnType<typeof useClassesQuery>;
export type ClassesLazyQueryHookResult = ReturnType<typeof useClassesLazyQuery>;
export type ClassesSuspenseQueryHookResult = ReturnType<typeof useClassesSuspenseQuery>;
export type ClassesQueryResult = Apollo.QueryResult<ClassesQuery, ClassesQueryVariables>;
export const CoursesDocument = gql`
    query Courses {
  courses {
    ...course
  }
}
    ${CourseFragmentDoc}`;

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
export function useCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesSuspenseQueryHookResult = ReturnType<typeof useCoursesSuspenseQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const EducationalFieldsDocument = gql`
    query EducationalFields {
  educationalFields {
    ...educationalField
  }
}
    ${EducationalFieldFragmentDoc}`;

/**
 * __useEducationalFieldsQuery__
 *
 * To run a query within a React component, call `useEducationalFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEducationalFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEducationalFieldsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEducationalFieldsQuery(baseOptions?: Apollo.QueryHookOptions<EducationalFieldsQuery, EducationalFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EducationalFieldsQuery, EducationalFieldsQueryVariables>(EducationalFieldsDocument, options);
      }
export function useEducationalFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EducationalFieldsQuery, EducationalFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EducationalFieldsQuery, EducationalFieldsQueryVariables>(EducationalFieldsDocument, options);
        }
export function useEducationalFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EducationalFieldsQuery, EducationalFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EducationalFieldsQuery, EducationalFieldsQueryVariables>(EducationalFieldsDocument, options);
        }
export type EducationalFieldsQueryHookResult = ReturnType<typeof useEducationalFieldsQuery>;
export type EducationalFieldsLazyQueryHookResult = ReturnType<typeof useEducationalFieldsLazyQuery>;
export type EducationalFieldsSuspenseQueryHookResult = ReturnType<typeof useEducationalFieldsSuspenseQuery>;
export type EducationalFieldsQueryResult = Apollo.QueryResult<EducationalFieldsQuery, EducationalFieldsQueryVariables>;
export const EducationalProgramsDocument = gql`
    query EducationalPrograms {
  educationalPrograms {
    ...educationalProgram
  }
}
    ${EducationalProgramFragmentDoc}`;

/**
 * __useEducationalProgramsQuery__
 *
 * To run a query within a React component, call `useEducationalProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEducationalProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEducationalProgramsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEducationalProgramsQuery(baseOptions?: Apollo.QueryHookOptions<EducationalProgramsQuery, EducationalProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EducationalProgramsQuery, EducationalProgramsQueryVariables>(EducationalProgramsDocument, options);
      }
export function useEducationalProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EducationalProgramsQuery, EducationalProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EducationalProgramsQuery, EducationalProgramsQueryVariables>(EducationalProgramsDocument, options);
        }
export function useEducationalProgramsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EducationalProgramsQuery, EducationalProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EducationalProgramsQuery, EducationalProgramsQueryVariables>(EducationalProgramsDocument, options);
        }
export type EducationalProgramsQueryHookResult = ReturnType<typeof useEducationalProgramsQuery>;
export type EducationalProgramsLazyQueryHookResult = ReturnType<typeof useEducationalProgramsLazyQuery>;
export type EducationalProgramsSuspenseQueryHookResult = ReturnType<typeof useEducationalProgramsSuspenseQuery>;
export type EducationalProgramsQueryResult = Apollo.QueryResult<EducationalProgramsQuery, EducationalProgramsQueryVariables>;
export const EducationalSystemsDocument = gql`
    query EducationalSystems {
  educationalSystems {
    ...educationalSystem
  }
}
    ${EducationalSystemFragmentDoc}`;

/**
 * __useEducationalSystemsQuery__
 *
 * To run a query within a React component, call `useEducationalSystemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEducationalSystemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEducationalSystemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEducationalSystemsQuery(baseOptions?: Apollo.QueryHookOptions<EducationalSystemsQuery, EducationalSystemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EducationalSystemsQuery, EducationalSystemsQueryVariables>(EducationalSystemsDocument, options);
      }
export function useEducationalSystemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EducationalSystemsQuery, EducationalSystemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EducationalSystemsQuery, EducationalSystemsQueryVariables>(EducationalSystemsDocument, options);
        }
export function useEducationalSystemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EducationalSystemsQuery, EducationalSystemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EducationalSystemsQuery, EducationalSystemsQueryVariables>(EducationalSystemsDocument, options);
        }
export type EducationalSystemsQueryHookResult = ReturnType<typeof useEducationalSystemsQuery>;
export type EducationalSystemsLazyQueryHookResult = ReturnType<typeof useEducationalSystemsLazyQuery>;
export type EducationalSystemsSuspenseQueryHookResult = ReturnType<typeof useEducationalSystemsSuspenseQuery>;
export type EducationalSystemsQueryResult = Apollo.QueryResult<EducationalSystemsQuery, EducationalSystemsQueryVariables>;
export const FacultiesDocument = gql`
    query Faculties {
  faculties {
    ...faculty
  }
}
    ${FacultyFragmentDoc}`;

/**
 * __useFacultiesQuery__
 *
 * To run a query within a React component, call `useFacultiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacultiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFacultiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFacultiesQuery(baseOptions?: Apollo.QueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
      }
export function useFacultiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
        }
export function useFacultiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, options);
        }
export type FacultiesQueryHookResult = ReturnType<typeof useFacultiesQuery>;
export type FacultiesLazyQueryHookResult = ReturnType<typeof useFacultiesLazyQuery>;
export type FacultiesSuspenseQueryHookResult = ReturnType<typeof useFacultiesSuspenseQuery>;
export type FacultiesQueryResult = Apollo.QueryResult<FacultiesQuery, FacultiesQueryVariables>;
export const LecturersDocument = gql`
    query Lecturers {
  lecturers {
    ...lecturer
  }
}
    ${LecturerFragmentDoc}`;

/**
 * __useLecturersQuery__
 *
 * To run a query within a React component, call `useLecturersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLecturersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLecturersQuery({
 *   variables: {
 *   },
 * });
 */
export function useLecturersQuery(baseOptions?: Apollo.QueryHookOptions<LecturersQuery, LecturersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LecturersQuery, LecturersQueryVariables>(LecturersDocument, options);
      }
export function useLecturersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LecturersQuery, LecturersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LecturersQuery, LecturersQueryVariables>(LecturersDocument, options);
        }
export function useLecturersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LecturersQuery, LecturersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LecturersQuery, LecturersQueryVariables>(LecturersDocument, options);
        }
export type LecturersQueryHookResult = ReturnType<typeof useLecturersQuery>;
export type LecturersLazyQueryHookResult = ReturnType<typeof useLecturersLazyQuery>;
export type LecturersSuspenseQueryHookResult = ReturnType<typeof useLecturersSuspenseQuery>;
export type LecturersQueryResult = Apollo.QueryResult<LecturersQuery, LecturersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

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
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StudentsDocument = gql`
    query Students($id: String, $take: Int, $pageIndex: Int) {
  students(id: $id, take: $take, pageIndex: $pageIndex) {
    students {
      ...student
    }
    totalCount
  }
}
    ${StudentFragmentDoc}`;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      take: // value for 'take'
 *      pageIndex: // value for 'pageIndex'
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
        }
export function useStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsSuspenseQueryHookResult = ReturnType<typeof useStudentsSuspenseQuery>;
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>;
export const StudentDocument = gql`
    query Student($studentId: String!) {
  student(id: $studentId) {
    ...student
  }
}
    ${StudentFragmentDoc}`;

/**
 * __useStudentQuery__
 *
 * To run a query within a React component, call `useStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentQuery(baseOptions: Apollo.QueryHookOptions<StudentQuery, StudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
      }
export function useStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentQuery, StudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
        }
export function useStudentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StudentQuery, StudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentQuery, StudentQueryVariables>(StudentDocument, options);
        }
export type StudentQueryHookResult = ReturnType<typeof useStudentQuery>;
export type StudentLazyQueryHookResult = ReturnType<typeof useStudentLazyQuery>;
export type StudentSuspenseQueryHookResult = ReturnType<typeof useStudentSuspenseQuery>;
export type StudentQueryResult = Apollo.QueryResult<StudentQuery, StudentQueryVariables>;