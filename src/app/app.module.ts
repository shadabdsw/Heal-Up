import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndexComponent } from './index/index.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { PatientService } from './services/patient.service';
import { ViewrecordComponent } from './viewrecord/viewrecord.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    routingComponents,
    ViewrecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    BackButtonDisableModule.forRoot({ preserveScrollPosition: true }),
  ],
  providers: [PatientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
