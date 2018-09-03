export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  shortname?: string;
  level: string;
  birthday: Date;
  sex: 'MALE' | 'FEMALE';
}
