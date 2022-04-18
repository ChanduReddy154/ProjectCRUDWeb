import { Component, OnInit } from '@angular/core';
import { Student } from '../Models/api-models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students : Student[] = []

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    //fetch students

    this.studentService.getStudents()
    .subscribe(
      (successResponse) => {
       this.students = successResponse
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );

  }

}
