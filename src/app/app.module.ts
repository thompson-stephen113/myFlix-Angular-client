import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { MovieDescriptionComponent } from "./movie-description/movie-description.component";
import { DirectorComponent } from "./director/director.component";
import { GenreComponent } from "./genre/genre.component";


const appRoutes: Routes = [
    { path: "welcome", component: WelcomePageComponent },
    { path: "movies", component: MovieCardComponent },
    { path: "profile", component: ProfileComponent},
    { path: "", redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        WelcomePageComponent,
        RegistrationComponent,
        LoginComponent,
        ProfileComponent,
        MovieCardComponent,
        MovieDescriptionComponent,
        DirectorComponent,
        GenreComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatIconModule,
        MatToolbarModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
