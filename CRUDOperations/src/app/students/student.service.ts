import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudentRequest } from '../Models/api-models/add-student-requesr.model';
import { Gender } from '../Models/api-models/gender.model';
import { Student } from '../Models/api-models/student.model';
//import { Gender } from '../Models/api-models/ui-models/gender.model';
//import { Student } from '../Models/api-models/ui-models/student.model';
import { UpdateStudentRequest } from '../Models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private baseApiUrl = 'http://localhost:65413/api/Student';
  private baseApiUrl1 = 'http://localhost:65413';
  constructor(private httpClient : HttpClient) { }

  deleteStudent(studentId : string) : Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/DeleteUser?studentId=' + studentId);
  }

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

  addStudent(studentRequest : Student) : Observable<Student> {
    const addStudentRequest : AddStudentRequest = {
      firstName : studentRequest.firstName,
      lastName: studentRequest.lastName,
      dob : studentRequest.dob,
      email : studentRequest.email,
      phoneNumber : studentRequest.phoneNumber,
      genderId : studentRequest.genderId,
      physicalAddress : studentRequest.address.physicalAddress,
      postalAddress : studentRequest.address.postalAddress
    };
    return this.httpClient.post<Student>(this.baseApiUrl + '/AddStudent', addStudentRequest);
  }

  uploadImage(studentId : string, file : File) : Observable<any> {
    const formData = new FormData();
    formData.append("profileImage",file);
   return this.httpClient.post(this.baseApiUrl + '/' + studentId + '/upload-image', formData, {
      responseType : 'text'
    });
  }

  getImagePath(relativePath : string) {
    return `${this.baseApiUrl1}/${relativePath}`;
  }


}
