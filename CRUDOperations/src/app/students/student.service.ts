import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private baseApiUrl = 'http://localhost:65413/api/Student';
  constructor(private httpClient : HttpClient) { }

  getStudents() : Observable<any> {
      return this.httpClient.get<any>(this.baseApiUrl + '/GetAllStudents')
  }
}
