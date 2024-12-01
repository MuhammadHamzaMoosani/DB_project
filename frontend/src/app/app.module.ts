import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { ResourceReuseableComponent } from './resource-reuseable/resource-reuseable.component';
import { LectureNotesComponent } from './lecture-notes/lecture-notes.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';
import { PastProjectComponent } from './past-project/past-project.component';
import { ExamComponent } from './exam/exam.component';
import { ExploreSearchComponent } from './explore-search/explore-search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExploreComponent } from './explore/explore.component';
import { FooterComponent } from './footer/footer.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatSelectModule } from '@angular/material/select';
import { OtpEnterComponent } from './otp-enter/otp-enter.component';
import { AlertComponent } from './alert/alert.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginCheckerComponent } from './login-checker/login-checker.component';
import { AdminResourceComponent } from './admin-resource/admin-resource.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    CoursepageComponent,
    FormsComponent,
    PagenotfoundComponent,
    SignInPageComponent,
    ResourceReuseableComponent,
    LectureNotesComponent,
    AssignmentsComponent,
    StudentNotesComponent,
    PastProjectComponent,
    ExamComponent,
    ExploreComponent,
    ExploreSearchComponent,
    SignUpComponent,
    FooterComponent,
    AddCourseComponent,
    OtpEnterComponent,
    AlertComponent,
    AdminReportComponent,
    BookmarkComponent,
    LoginCheckerComponent,
    AdminResourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    AsyncPipe,
    RouterModule.forRoot([
      {path:'',component:HomepageComponent},
      {path:'course/:course/:id',component:CoursepageComponent},
      {path:'course/:course/:id/LectureNotes',component:LectureNotesComponent},
      {path:'course/:course/:id/Assignments',component:AssignmentsComponent},
      {path:'course/:course/:id/StudentNotes',component:StudentNotesComponent},
      {path:'course/:course/:id/PastProjects',component:PastProjectComponent},
      {path:'course/:course/:id/Examinations',component:ExamComponent},
      {path:'explore',component:ExploreComponent},
      {path:'SignIn',component:SignInPageComponent},
      {path:'SignUp',component:SignUpComponent},
      {path:'otp',component:OtpEnterComponent},
      {path:'bookmark',component:BookmarkComponent},

      {path:'admin/addCourse',component:AddCourseComponent},
      { path: '**', component:PagenotfoundComponent },
    ])
  ],
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
