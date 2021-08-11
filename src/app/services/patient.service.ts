import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patientCollection?: AngularFirestoreCollection<Patient>;
  patientDoc?: AngularFirestoreDocument<Patient>;
  patients?: Observable<Patient[]>;

  constructor(public afs: AngularFirestore) {}

  //when using Promise
  // getAll(): Promise<Patient[]> {
  //   return new Promise((resolve, reject) => {
  //     this.afs
  //       .collection('patients')
  //       .get()
  //       .subscribe((r) => {
  //         if (r.docs) {
  //           let patients: Patient[] = [];
  //           r.forEach((ele) => {
  //             patients.push(ele.data() as Patient);
  //           });
  //           resolve(patients);
  //         } else {
  //           reject('EMPTY');
  //         }
  //       });
  //   });
  // }

  getAllPatientRecords() {
    //using Observable
    return this.afs.collection('patients').valueChanges();
  }

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

  // temp() {
  //   this.afs
  //     .collection('patients')
  //     .doc()
  //     .set({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       age: 25,
  //       gender: 'male',
  //       emailAddress: 'a@a.com',
  //       phoneNumber: 123123123,
  //       patientType: 'OPD',
  //     })
  //     .then(() => {
  //       console.log('Data sent');
  //     })
  //     .catch((error) => {
  //       console.error('DATA NOT SENT', error);
  //     });
  // }

  addPatient(patient: Patient) {
    return this.afs.collection('patients').add(patient);
  }

  deleteItem(patient: Patient) {
    // return this.afs.collection('patients').doc(patient.id).delete();
    this.patientDoc = this.afs.doc(`patients/${patient.id}`);
    console.log(this.afs.doc(`patients/${patient.id}`));
    this.patientDoc.delete();
    console.log('delete patient is running');
  }
}
