import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-models/ui-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private baseApiUrl = 'http://localhost:65413/api/Student';
  constructor(private httpClient : HttpClient) { }

  getStudents() : Observable<Student[]> {
      return this.httpClient.get<Student[]>(this.baseApiUrl + '/GetAllStudents')
  }

  getStudentById(studentId : string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/GetStudentsById?studentId=' + studentId)
  }
}
