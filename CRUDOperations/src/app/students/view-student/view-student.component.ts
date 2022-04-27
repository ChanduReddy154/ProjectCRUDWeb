import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/Models/api-models/ui-models/gender.model';
import { Student } from 'src/app/Models/api-models/ui-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  header = '';
  isNewStudent = false;
  genderList :Gender[] = [];
  displayProfileImageUrl = '';
  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm

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
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(
      (params) => {
       this.studentId = params.get('id');

       if(this.studentId) {
         //if  route contains the add

    if(this.studentId.toLowerCase() === 'AddStudent'.toLowerCase()) {
      // new student functionality
      this.isNewStudent = true;
      this.header = 'Add New Student';
      this.setImage();
   }else {
     //Existing Student Functionality
     this.isNewStudent =false;
     this.header = 'Edit Student'
     this.studentService.getStudentById(this.studentId)
     .subscribe (
       (successResponse) => {
         this.student = successResponse;
         this.setImage();
       },
       (errorResponse) => {
         this.setImage();
       }
     );
   }
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
    if(this.studentDetailsForm?.form.valid) {
      this.studentService.updateStudent(this.student.id,this.student)
    .subscribe(
      (successResponse) => {
        this.snackBar.open('Student Updated Succesfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('students');
         }, 2000)
      },
      (errorResponse) => {

      }
    )
    }
    
  }

  onDelete() : void {
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) => {
       this.snackBar.open('Student Successfully Deleted', undefined, {
         duration : 2000
       });
       setTimeout(() => {
        this.router.navigateByUrl('students');
       }, 2000)

      },
      (errorResponse) => {

      }
    )
  }

  onAdd() : void {
    if(this.studentDetailsForm?.form.valid) {
      this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse) => {
        this.snackBar.open('Student Added Succesfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl(`students/${successResponse.id}`);
         }, 2000)
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
    }
    
  }

  uploadImage(event : any) : void {
    if(this.studentId) {
     const file: File = event.target.files[0];
     this.studentService.uploadImage(this.student.id, file)
     .subscribe(
       (successResponse) => {
        this.student.profileImageURL = successResponse;
        this.setImage();
        this.snackBar.open('Profile picture updated Succesfully', undefined, {
          duration: 2000
        });
        
       },
       (errorResponse) => {

       }
     );
    }
  }

  private setImage() : void {
    if(this.student.profileImageURL) {

      //fetch the image by Url
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageURL);
    } else {
      //display a default
      this.displayProfileImageUrl = '/assets/panda.jpg';
    }
}

}
