import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { map } from 'rxjs/operators'; 



@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patientCollection?: AngularFirestoreCollection<Patient>;
  patientDoc?: AngularFirestoreDocument<Patient>;
  patients?: Observable<Patient[]>;

  constructor(public afs: AngularFirestore) {
    // getting document ID
    this.patients = this.afs.collection('patients')
    .snapshotChanges()
    .pipe(
      map(
      changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Patient;
          data.id = a.payload.doc.id;
          console.log(data.id);
          return data;
        })
      })
    );
  }

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

  getPatients() {
    return this.patients;
  }

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
    this.patientDoc = this.afs.doc(`patients/${patient.id}`);
    this.patientDoc.delete();
  }

  // deletePatient(patient: Patient) {
  //   patient;
  //   console.log(
  //     this.afs
  //       .collection('patients')
  //       .get()
  //       .subscribe((r) => {
  //         const dat = [];
  //         console.log(
  //           r.docs.forEach((doc) => {
  //             doc.data();
  //             dat.push(doc);
  //           })
  //         );
  //       })
  //   );
  // }
}
