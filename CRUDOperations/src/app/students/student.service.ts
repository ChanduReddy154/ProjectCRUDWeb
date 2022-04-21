import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../Models/api-models/gender.model';
//import { Gender } from '../Models/api-models/ui-models/gender.model';
import { Student } from '../Models/api-models/ui-models/student.model';
import { UpdateStudentRequest } from '../Models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private baseApiUrl = 'http://localhost:65413/api/Student';
  constructor(private httpClient : HttpClient) { }

  updateStudent(studentId:string, studentRequest : Student) : Observable<Student> {
    const updateStudentRequest : UpdateStudentRequest = {
      firstName : studentRequest.firstName,
      lastName: studentRequest.lastName,
      dob : studentRequest.dob,
      email : studentRequest.email,
      phoneNumber : studentRequest.phoneNumber,
      genderId : studentRequest.genderId,
      physicalAddress : studentRequest.address.physicalAddress,
      postalAddress : studentRequest.address.postalAddress
    }
    return this.httpClient.put<Student>(this.baseApiUrl + '/UpdateStudent?studentId=' + studentId, updateStudentRequest );

    }

  getGenders() : Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/GetGender')
}

  getStudents() : Observable<Student[]> {
      return this.httpClient.get<Student[]>(this.baseApiUrl + '/GetAllStudents')
  }

  getStudentById(studentId : string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/GetStudentsById?studentId=' + studentId)
  }


}
