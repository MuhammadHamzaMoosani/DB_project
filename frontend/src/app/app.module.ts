import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { FormsComponent } from './forms/forms.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { provideHttpClient } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    CoursepageComponent,
    FormsComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {path:'',component:HomepageComponent},
      {path:'course/:course/:id',component:CoursepageComponent},
      { path: '**', component:PagenotfoundComponent },
    ])
  ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
