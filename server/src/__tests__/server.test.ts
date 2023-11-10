import { createApolloServer } from "../server";

import request from "supertest";

import { faker } from "@faker-js/faker";

const queryData = (id: number) => ({
  query: `mutation CreateStudent($createStudentInput: CreateStudentInput!) {
    createStudent(createStudentInput: $createStudentInput) {
      success
      message
      student {
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
          year
        }
        user {
          id
          username
          role {
            id
            name
          }
          createdAt
        }
      }
      errors {
        path
        message
      }
    }
  }`,
  variables: {
    createStudentInput: {
      username: `47.01.104.${id}`,
      password: "02052002",
      id: `47.01.104.${id}`,
      name: faker.internet.userName(),
      address: "",
      area: "",
      classId: 1,
      country: "",
      courseId: 1,
      district: "",
      dob: "02/05/2002",
      email: "",
      ethnicity: "",
      fatherName: "",
      gender: 1,
      identification: "",
      motherName: "",
      numberPhone: "",
      permanentAddress: "",
      pob: "",
      positionId: "R05.01",
      priority: false,
      province: "",
      relativeAddress: "",
      relativeName: "",
      relativeNumberPhone: "",
      religion: "",
      studentType: "",
      studyStatus: "",
      facultyId: "COMP",
    },
  },
});

describe("e2e", () => {
  let apolloServer, port;

  beforeAll(async () => {
    ({ apolloServer, port } = await createApolloServer({ port: 4001 }));
  });

  afterAll(async () => {
    await apolloServer?.stop();
  });

  for (let i = 0; i < 100; i++) {
    const randomId = faker.number.int({ min: 100, max: 999 });

    it("create student", async () => {
      const response = await request(`http://localhost:${port}/graphql`)
        .post("/")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5OTQ3NjE1OSwiZXhwIjoxNjk5NDc5NzU5fQ.pl0oVLzoI2QhMMEJ92mo2Kfq7rDyE2jFChh1gPP8F3I"
        )
        .send(queryData(randomId));

      expect(response.errors).toBeUndefined();

      expect(response.body?.data?.createStudent?.success).toEqual(true);
    });
  }
});
