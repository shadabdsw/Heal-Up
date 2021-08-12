import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patientDoc?: AngularFirestoreDocument<Patient>;
  patients?: Observable<Patient[]>;

  constructor(public afs: AngularFirestore) {
    // getting document IDs on load as it is in constructor
    this.patients = this.afs
      .collection('patients')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as Patient;
            data.id = a.payload.doc.id;
            //console.log(data.id);
            return data;
          });
        })
      );
  }

  /* when using Promise getting all Patient details
  getAll(): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('patients')
        .get()
        .subscribe((r) => {
          if (r.docs) {
            let patients: Patient[] = [];
            r.forEach((ele) => {
              patients.push(ele.data() as Patient);
            });
            resolve(patients);
          } else {
            reject('EMPTY');
          }
        });
    });
  }*/

  //get Patients
  getPatients() {
    return this.patients;
  }

  //using Observable getting all Patient details
  getAllPatientRecords() {
    return this.afs.collection('patients').valueChanges();
  }

  //getting Object of Patient's details by ID
  getItemById(id: string): Promise<Patient> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('patients')
        .doc(id)
        .get()
        .subscribe((r) => {
          r.exists
            ? resolve(r.data() as Patient)
            : reject('unable to fetch item');
        });
    });
  }

  /*temporary adding data to db
  temp() {
    this.afs
      .collection('patients')
      .doc()
      .set({
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        gender: 'male',
        emailAddress: 'a@a.com',
        phoneNumber: 123123123,
        patientType: 'OPD',
      })
      .then(() => {
        console.log('Data sent');
      })
      .catch((error) => {
        console.error('DATA NOT SENT', error);
      });
  } */

  //adds Patient data from Register Form
  addPatient(patient: Patient) {
    return this.afs.collection('patients').add(patient);
  }

  //deletes Patient data from DB
  deletePatient(patient: Patient) {
    this.patientDoc = this.afs.doc(`patients/${patient.id}`);
    this.patientDoc.delete();
  }
}
