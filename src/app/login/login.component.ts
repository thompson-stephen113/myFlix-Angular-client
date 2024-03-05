import { Component, OnInit, Input } from "@angular/core";
import { UserRegistrationService } from "../fetch-api-data.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	// Defines custom HTML element
	selector: "login-form",

	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
	// Defines the component's input
	@Input() userData = { Username: "", Password: "" };

	constructor(
		public fetchApiData: UserRegistrationService,
		public dialogRef: MatDialogRef<LoginComponent>,
		public snackBar: MatSnackBar
	) { }

	// Called once the component has received all inputs 
	ngOnInit(): void {
	}

	loginUser(): void {
		this.fetchApiData.userLogin(this.userData).subscribe((response) => {
			// Logic for successful user registration
			this.dialogRef.close();
			console.log(response);
			this.snackBar.open("Login successful.", "OK", {
				duration: 2000
			});
		}, (response) => {
			console.log(response);
			this.snackBar.open(response, "OK", {
				duration: 2000
			});
		});
	};

}
