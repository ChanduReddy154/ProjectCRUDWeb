import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/Models/api-models/ui-models/gender.model';
import { Student } from 'src/app/Models/api-models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  genderList :Gender[] = [];

  studentId : string |  null | undefined;
  student : Student = {
    id : '',
    firstName : '',
    lastName : '',
    dob : '',
    email :'',
    phoneNumber : '',
    genderId: '',
    profileImageURL : '',
    gender : {
      id : '',
      description : '',
    },
    address : {
      id : '',
      physicalAddress : '',
      postalAddress : ''
    }

  }

  constructor(private readonly studentService : StudentService,
    private readonly route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
       this.studentId = params.get('id');

       if(this.studentId) {
        this.studentService.getStudentById(this.studentId)
        .subscribe (
          (successResponse) => {
            this.student = successResponse;
          }
        );
        this.studentService.getGenders()
        .subscribe(
          (successResponse) => {
           this.genderList = successResponse;
           }
        );
       }
      }
    );

  }

  onUpdate() : void {
    //call student service to update student
    this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse) => {
        this.snackBar.open('Student Updated Succesfully', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {

      }
    )
  }

}
