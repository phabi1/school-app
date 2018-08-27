import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const STUDENTS = [
  {
    id: '1',
    firstname: 'varddan',
    lastname: 'atachian',
    level: 'PS',
  },
  {
    id: '2',
    firstname: 'mariame',
    lastname: 'bah',
    level: 'PS',
  },
  {
    id: '3',
    firstname: 'adam mohand',
    lastname: 'belbachir',
    level: 'PS',
  },
  {
    id: '4',
    firstname: 'enzo',
    lastname: 'carvalho-da silva',
    level: 'PS',
  },
  {
    id: '5',
    firstname: 'ines',
    lastname: 'dalo-bekanga',
    level: 'PS',
  },
  {
    id: '6',
    firstname: 'curtis',
    lastname: 'david',
    level: 'PS',
  },
  {
    id: '7',
    firstname: 'assa',
    lastname: 'gassama',
    level: 'PS',
  },
  {
    id: '8',
    firstname: 'emilia',
    lastname: 'lihet',
    level: 'PS',
  },
  {
    id: '9',
    firstname: 'mehola',
    lastname: 'ndungidi',
    level: 'PS',
  },
  {
    id: '10',
    firstname: 'lilia',
    lastname: 'salame al barche',
    level: 'PS',
  },
  {
    id: '11',
    firstname: 'said',
    lastname: 'sekhri',
    level: 'PS',
  },
  {
    id: '12',
    firstname: 'christian',
    lastname: 'takfor',
    level: 'PS',
  },
  {
    id: '13',
    firstname: 'fatima',
    lastname: 'touil',
    level: 'PS',
  }
  , {
    id: '14',
    firstname: 'taline',
    lastname: 'barco-dos santos',
    level: 'MS',
  },
  {
    id: '15',
    firstname: 'lyana',
    lastname: 'duarte',
    level: 'MS',
  },
  {
    id: '16',
    firstname: 'remon',
    lastname: 'gobran',
    level: 'MS',
  },
  {
    id: '17',
    firstname: 'antoni',
    lastname: 'matlosz',
    level: 'MS',
  },
  {
    id: '18',
    firstname: 'evan',
    lastname: 'moret',
    level: 'MS',
  },
  {
    id: '19',
    firstname: 'andrii',
    lastname: 'vaipan',
    level: 'MS',
  }
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Observable<any[]> {
    return of(STUDENTS);
  }
}
