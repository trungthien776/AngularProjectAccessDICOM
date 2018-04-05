import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PatientComponent } from './patient/patient.component';
import { StudyComponent } from './study/study.component';
import { WebViewerDirectiveDirective } from './web-viewer/web-viewer-directive.directive';
import { WebViewerComponent } from './web-viewer/web-viewer.component';
import { SeriesComponent } from './series/series.component';
import { LoginComponent } from './login/login.component';
import { Example } from "./web-viewer/example.directive";
const routesConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'patients/:id/studies', component: StudyComponent },
  { path: 'studies/:id/series', component: SeriesComponent },
  { path: 'series/:id/instances', component: WebViewerComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    StudyComponent,
    SeriesComponent,
    LoginComponent,
    WebViewerComponent,
    WebViewerDirectiveDirective,
    Example
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(routesConfig),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
