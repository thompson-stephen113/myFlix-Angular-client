import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
	// Defines custom HTML element
	selector: "navbar",

	templateUrl: "./navbar.component.html",
	styleUrl: "./navbar.component.css"
})

export class NavbarComponent implements OnInit {
	/**
	 * @constructor
	 * @param {Router} router - The service for route navigation.
	 * @param {MatSnackBar} snackBar - The service that displays notifications.
	 */
	constructor(
		public router: Router,
		public snackBar: MatSnackBar
	) { };

	// Initializes component
	ngOnInit(): void {
	};

	/**
	 * Navigates to "movies" route
	 * @function
	 * @name openMovies
	 */
	public openMovies(): void {
		this.router.navigate(["movies"]);
	};

	/**
	 * Navigates to "profile" route
	 * @function
	 * @name openProfile
	 */
	public openProfile(): void {
		this.router.navigate(["profile"]);
	};

	/**
	 * Logs user out
	 * @function
	 * @name logoutUser
	 * @returns Message "Logged out."
	 */
	public logoutUser(): void {
		localStorage.setItem("user", "");
		localStorage.setItem("token", "");

		// Navigates to "welcome" route
		this.router.navigate(["welcome"]);

		// Opens dialog
		this.snackBar.open("Logged out.", "OK", {
			duration: 2000
		});
	};
};
