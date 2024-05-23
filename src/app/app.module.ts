import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TableComponent } from './table/table.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SampleComponent } from './sample/sample.component';
import {HttpClientModule} from '@angular/common/http';
import { JsontransComponent } from './jsontrans/jsontrans.component'

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    SignUpComponent,
    TableComponent,
    SampleComponent,
    JsontransComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
