import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

interface PatientType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register1.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myGenderModel = 0;
  myPatientModel = 0;

  // registerForm = new FormGroup({
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
  //   gender: new FormControl('', Validators.required),
  //   emailAddress: new FormControl('', [Validators.required, Validators.email]),
  //   phoneNumber: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(10),
  //   ]),
  //   patientType: new FormControl('', Validators.required),
  // });

  patienttypes: PatientType[] = [
    { value: 'OPD', viewValue: 'OPD' },
    { value: 'IPD', viewValue: 'IPD' },
    { value: 'Emergency', viewValue: 'Emergency' },
  ];

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  patientType = new FormControl('', [Validators.required]);

  constructor(
    public patientSvc: PatientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // onSubmit() {
  //   let data = this.registerForm.value;
  //   let patient: Patient = {
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     age: data.age,
  //     gender: data.gender,
  //     emailAddress: data.emailAddress,
  //     phoneNumber: data.phoneNumber,
  //     patientType: data.patientType,
  //   };

  //on click Submit button - add new patient data to DB
  //   this.patientSvc.addPatient(patient).then(
  //     (r) => {
  //       this.snackBar.open('Data Added Successfully!', '', { duration: 2000 });
  //       this.registerForm.reset();
  //     },
  //     (err) => {
  //       this.snackBar.open('Operation Failed!', '', { duration: 2000 });
  //     }
  //   );
  // }

  onRegister() {
    let patient1: Patient = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      age: this.age.value,
      gender: this.gender.value,
      emailAddress: this.email.value,
      phoneNumber: this.phone.value,
      patientType: this.patientType.value,
    };

    this.patientSvc.addPatient(patient1).then(
      (r) => {
        this.snackBar.open('Data Added Successfully!', '', { duration: 2000 });
        this.firstName.reset();
        this.lastName.reset();
        this.age.reset();
        this.gender.reset();
        this.email.reset();
        this.phone.reset();
        this.patientType.reset();
      },
      (err) => {
        this.snackBar.open('Operation Failed!', '', { duration: 2000 });
      }
    );
  }
}
