import { ViewChild, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

// export interface PatientTable {
//   firstName: string;
//   lastName: string;
//   age: number;
//   gender: string;
//   emailAddress: string;
//   phoneNumber: number;
//   patientType: string;
// }

// const PATIENT_DATA: PatientTable[] = [
//   {
//     firstName: 'Alpha',
//     lastName: 'Beta',
//     age: 25,
//     gender: 'Male',
//     emailAddress: 'aaa',
//     phoneNumber: 9090900909,
//     patientType: 'OPD',
//   },
//   {
//     firstName: 'SAlpha',
//     lastName: 'Beta',
//     age: 26,
//     gender: 'Male',
//     emailAddress: 'aaa',
//     phoneNumber: 9090900909,
//     patientType: 'OPD',
//   },
//   {
//     firstName: 'QAlpha',
//     lastName: 'Beta',
//     age: 27,
//     gender: 'Male',
//     emailAddress: 'a@a.com',
//     phoneNumber: 9090900909,
//     patientType: 'OPD',
//   },
//   {
//     firstName: 'VAlpha',
//     lastName: 'Beta',
//     age: 28,
//     gender: 'Male',
//     emailAddress: 'a@a.com',
//     phoneNumber: 9090900909,
//     patientType: 'OPD',
//   },
//   {
//     firstName: 'PAlpha',
//     lastName: 'Beta',
//     age: 29,
//     gender: 'Male',
//     emailAddress: 'a@a.com',
//     phoneNumber: 9090900909,
//     patientType: 'OPD',
//   },
// ];

@Component({
  selector: 'app-viewrecord',
  templateUrl: './viewrecord.component.html',
  styleUrls: ['./viewrecord.component.css'],
})
export class ViewrecordComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatient!: Patient; //to store details of selected Patient as Patient Object

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  // dataSource = new MatTableDataSource<PatientTable>(PATIENT_DATA);

  // displayedColumns: string[] = [
  //   'firstName',
  //   'lastName',
  //   'age',
  //   'gender',
  //   'emailAddress',
  //   'phoneNumber',
  //   'patientType',
  // ];
  // clickedRows = new Set<PatientTable>();

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource = this.dataSource;
  //   this.dataSource.sort = this.sort;
  // }

  constructor(public patientSvc: PatientService, public snackBar: MatSnackBar) {
    /* when using Promise getting all Patient details
    this.patientSvc.getAll().then(
      (r) => {
        this.patients = r;
      },
      (err) => {
        console.log(err);
      }
    ); */

    //using Observable getting all data and showing on table
    this.patientSvc.getAllPatientRecords().subscribe(
      (r: any) => {
        this.patients = r;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //get Patient's details on single click as Object
  onSelect(p: Patient) {
    //console.log(p);
    this.selectedPatient = p;
  }

  //delete Patient on double click event
  deleteItem(event: any, p: Patient) {
    this.patientSvc.deletePatient(p);
    this.snackBar.open('Data Deletion Successful!', '', { duration: 2000 });
    //console.log('delete item is running');
  }

  ngOnInit() {
    //gets all documents on load as it is in ngOnInIt
    this.patientSvc.getPatients()?.subscribe((pats) => {
      //console.log(pats);
      this.patients = pats;
    });
  }
}
