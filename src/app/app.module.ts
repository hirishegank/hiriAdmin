import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CountComponent } from './count/count.component';
import { OverviewComponent } from './overview/overview.component';
import { CollapseComponent } from './collapse/collapse.component';
import { from } from 'rxjs';
import { StarratingComponent } from './starrating/starrating.component';
import { ChefmanagementComponent } from './chefmanagement/chefmanagement.component';
import { SettingsComponent } from './settings/settings.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ReportComponent } from './report/report.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CountComponent,
    OverviewComponent,
    CollapseComponent,
    StarratingComponent,
    ChefmanagementComponent,
    SettingsComponent,
    ForecastComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
