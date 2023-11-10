export class CreateModuleClassInput {
  semesterId: number;
  schoolDay: number;
  classStart: number;
  classEnd: number;
  startDate: Date;
  startEnd: Date;
  maximum: number;
  testDate?: Date;
  lecturerId: string;
  room?: string;
  moduleId: string;
}
