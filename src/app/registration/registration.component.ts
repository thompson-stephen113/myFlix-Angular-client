import { Component, OnInit, Input } from "@angular/core";
import { UserRegistrationService } from "../fetch-api-data.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	// Defines custom HTML element
	selector: "registration-form",

	templateUrl: "./registration.component.html",
	styleUrl: "./registration.component.css"
})
export class RegistrationComponent implements OnInit {
	// Defines the component's input
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	constructor(
		public fetchApiData: UserRegistrationService,
		public dialogRef: MatDialogRef<RegistrationComponent>,
		public snackBar: MatSnackBar
	) { }

	// Called once the component has received all inputs 
	ngOnInit(): void {
	}

	registerUser(): void {
		this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
			// Logic for successful user registration
			this.dialogRef.close();
			console.log(response);
			this.snackBar.open("User registered successfully.", "OK", {
				duration: 2000
			});
		}, (response) => {
			console.log(response);
			this.snackBar.open(response, "OK", {
				duration: 2000
			});
		});
	};
};
