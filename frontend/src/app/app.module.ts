import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { CoursepageComponent } from './coursepage/coursepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    CoursepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    RouterModule.forRoot([
      {path:'',component:HomepageComponent},
      {path:'course/:course',component:CoursepageComponent},
    ])
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
