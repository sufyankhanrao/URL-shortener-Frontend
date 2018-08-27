import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {RequestsService} from "./requests.service";
import {StoreService} from './store.service';
import { UrltableComponent } from './urltable/urltable.component';
import { MiliTOdatePipe } from './mili-todate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpirypageComponent } from './expirypage/expirypage.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    UrltableComponent,
    MiliTOdatePipe,
    ExpirypageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:LandingComponent
      },
      {
        path:"dashboard/:id",
        component:DashboardComponent
      },
      {
        path:"expirypage",
        component:ExpirypageComponent
      }
    ])
  ],
  providers: [RequestsService,StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
