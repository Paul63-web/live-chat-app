import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardGuard } from './guards/app-guard.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowMoreComponent } from './show-more/show-more.component';
import { SignupComponent } from './signup/signup.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {path: "", pathMatch:"full", redirectTo:"/home"},
  {path: "home", component: LandingPageComponent},
  {path: "signup", component: SignupComponent, canActivate:[AppGuardGuard]},
  {path: "login", component: LoginComponent},
  {path: "profile/:username", component: ShowMoreComponent, children: [
    {path: "profile/preview", component: ViewProfileComponent}
  ]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
