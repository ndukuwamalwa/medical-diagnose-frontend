import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccountPageComponent } from './account/account-page/account-page.component';
import { DiagnoseComponent } from './account/diagnose/diagnose.component';
import { HistoryComponent } from './account/history/history.component';
import { BioComponent } from './account/bio/bio.component';
import { PortalComponent } from './account/portal/portal.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { DiagnosisComponent } from './account/diagnosis/diagnosis.component';
import { DiagnosisService } from './services/diagnosis.service';
import { UserService } from './services/user.service';
import { Http } from './services/http';
import { LoaderComponent } from './elements/loader/loader.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AccountPageComponent,
    DiagnoseComponent,
    HistoryComponent,
    BioComponent,
    PortalComponent,
    HeaderComponent,
    DiagnosisComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatInputModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DiagnosisService,
    UserService,
    Http
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
