export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: 'MALE' | 'FEMALE';
  birthday: Date;
  notes: string;
  grade: string;
  pictureUrl: string;
}
