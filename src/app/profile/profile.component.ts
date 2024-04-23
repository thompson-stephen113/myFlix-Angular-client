import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
	// Defines custom HTML element
	selector: "app-profile",

	templateUrl: "./profile.component.html",
	styleUrl: "./profile.component.css"
})

export class ProfileComponent implements OnInit {
	// Defines component's input
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "", FavoriteMovies: [] };
	FavoriteMovies: any[] = [];
	movies: any[] = [];
	user: any = {};

	/**
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData - The service that fetches data from the API.
	 * @param {MatSnackBar} snackBar - The service that displays notifications.
	 * @param {Router} router - The service for route navigation.
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public snackBar: MatSnackBar,
		private router: Router
	) { };

	// Initializes component with getProflie() and getFavorites() executed
	ngOnInit(): void {
		this.getProfile();
		this.getFavorites();
	};

	/**
	 * Gets user profile details
	 * @function
	 * @name getProfile
	 */
	getProfile(): void {
		this.user = this.fetchApiData.getUser();
		this.userData.Username = this.user.Username;
		this.userData.Password = this.user.Password;
		this.userData.Email = this.user.Email;
		this.userData.Birthday = this.user.Birthday;
		this.fetchApiData.getAllMovies().subscribe((response) => {
			this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
		});
	};

	/**
	 * Allows users to update their profile
	 * @function
	 * @name updateUser
	 * @returns Message "Profile updated successfully."
	 */
	updateUser(): void {
		this.fetchApiData.updateUser(this.userData).subscribe((response) => {
			console.log("Updated", response);
			localStorage.setItem("user", JSON.stringify(response));

			// Opens dialog
			this.snackBar.open("Profile updated successfully.", "OK", {
				duration: 2000
			});
		});
	};

	/**
	 * Allows users to delete their account
	 * @function
	 * @name deleteUser
	 * @returns Message "Are you sure you want to delete your account?"
	 * @returns Message "Deleted user."
	 */
	deleteUser(): void {
		if (confirm("Are you sure you want to delete your account?")) {
			this.fetchApiData.deleteUser().subscribe((response) => {
				console.log("Deleted user.", response);
				localStorage.clear();

				// Navigates to "welcome" route
				this.router.navigate(["welcome"]);
			});
		};
	};

	/**
	 * Gets user Favorite Movies
	 * @function
	 * @name getFavorites
	 */
	getFavorites(): void {
		this.user = this.fetchApiData.getUser();
		this.userData.FavoriteMovies = this.user.FavoriteMovies;
		this.FavoriteMovies = this.user.FavoriteMovies;
		console.log("Favorites: " + `${this.FavoriteMovies}`);
	};

	/**
	 * Removes favorited movie from Favorites
	 * @function
	 * @name deleteFavorite
	 * @param {String} movieID - ID of movie in the list of Favorites.
	 * @returns Message "Removed from Favorites."
	 */
	deleteFavorite(movieID: string): void {
		this.user = this.fetchApiData.getUser();
		this.userData.Username = this.user.Username;
		this.fetchApiData.deleteFavorite(movieID).subscribe((response) => {
			localStorage.setItem("user", JSON.stringify(response));
			this.getFavorites();
			this.getProfile();

			// Opens dialog
			this.snackBar.open("Removed from Favorites.", "OK", {
				duration: 2000
			});
		});
	};
};
