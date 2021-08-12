import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    gender: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    patientType: new FormControl('', Validators.required),
  });

  constructor(
    public patientSvc: PatientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let data = this.registerForm.value;
    let patient: Patient = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      emailAddress: data.emailAddress,
      phoneNumber: data.phoneNumber,
      patientType: data.patientType,
    };

    this.patientSvc.addPatient(patient).then(
      (r) => {
        this.snackBar.open('Data Added Successfully!', '', { duration: 2000 });
        this.registerForm.reset();
      },
      (err) => {
        this.snackBar.open('Operation Failed!', '', { duration: 2000 });
      }
    );
  }
}
