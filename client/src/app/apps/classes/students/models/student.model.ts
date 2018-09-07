export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: 'MALE' | 'FEMALE' | 'UNKNOW';
  birthday: Date;
  notes: string;
  grade: string;
  picture: string;
  pictureUrl: string;
}

export function createStudent(): Student {
  return {
    id: null,
    firstname: null,
    lastname: null,
    shortname: null,
    sex: 'UNKNOW',
    birthday: null,
    notes: null,
    grade: null,
    picture: null,
    pictureUrl: null,
  };
}
