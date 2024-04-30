import { Component, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { MovieDescriptionComponent } from "../movie-description/movie-description.component";
import { DirectorComponent } from "../director/director.component";
import { GenreComponent } from "../genre/genre.component";


@Component({
	selector: "movie-card",

	templateUrl: "./movie-card.component.html",
	styleUrl: "./movie-card.component.scss"
})

export class MovieCardComponent implements OnInit {
	movies: any[] = [];
	user: any = {};
	userData = { Username: "", FavoriteMovies: []};
	FavoriteMovies: any[] = [];
	isFavoriteMovie: boolean = false;

	/**
	 * @constructor
	 * @param {FetchApiDataService} fetchApiData - The service that fetches data from the API.
	 * @param {MatDialog} dialog - The service for opening dialogs.
	 * @param {MatSnackBar} snackBar - The service that displays notifications.
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) { };

	// Initializes component with getMovies() and getFavorites() executed
	ngOnInit(): void {
		this.getMovies();
		this.getFavorites();
	};

	/**
	 * Gets all movies from "movies" endpoint
	 * @function
	 * @name getMovies
	 * @returns movies
	 */
	getMovies(): void {
		this.fetchApiData.getAllMovies().subscribe((response: any) => {
			this.movies = response;
			console.log(this.movies);
			return this.movies;
		});
	};

	/**
	 * Opens dialog for movie description
	 * @function
	 * @name openDescription
	 * @param {String} description - The description of the movie.
	 */
	openDescription(description: string): void {
		this.dialog.open(MovieDescriptionComponent, {
			data: {
				Description: description,
			},
			width: "500px"
		});
	};

	/**
	 * Opens dialog for movie director
	 * @function
	 * @name openDirector
	 * @param {String} name - The name of the director.
	 * @param {String} bio - The biography of the director.
	 * @param {String} birth -The birth date of the director.
	 * @param {String} death - The death date of the director (if applicable).
	 */
	openDirector(
		name: string,
		bio: string,
		birth: string,
		death: string
	): void {
		this.dialog.open(DirectorComponent, {
			data: {
				Name: name,
				Bio: bio,
				Birth: birth,
				Death: death
			},
			width: "500px"
		});
	};

	/**
	 * Opens dialog for movie genre
	 * @function
	 * @name openGenre
	 * @param {String} name - The name of the genre.
	 * @param {String} description - The description of the genre.
	 */
	openGenre(name: string, description: string): void {
		this.dialog.open(GenreComponent, {
			data: {
				Name: name,
				Description: description
			},
			width: "500px"
		});
	};
	
	/**
	 * Gets the user's favorites
	 * @function
	 * @name getFavorites
	 */
	getFavorites(): void {
		this.user = this.fetchApiData.getUser();
		this.userData.FavoriteMovies = this.user.FavoriteMovies;
		this.FavoriteMovies = this.user.FavoriteMovies;
		console.log("Favorite Movies: ", this.FavoriteMovies);
	};

	/**
	 * Checks if a movie is a favorite of the user
	 * @function
	 * @name isFavorite
	 * @param {any} movie - The movie being checked.
	 * @returns {boolean} - The boolean of if the movie is favorite or not.
	 */
	isFavorite(movie: any): any {
		const movieID = movie._id;

		if (this.FavoriteMovies.some((movie) => movie === movieID)) {
			return true;
		} else {
			return false;
		};
	};

	/**
	 * Adds movie to Favorites
	 * @function
	 * @name addFavorite
	 * @param {String} movieID - The movie being added to Favorites.
	 */
	addFavorite(movieID: string): void {
		this.user = this.fetchApiData.getUser();
		this.userData.Username = this.user.Username;
		this.fetchApiData.addFavorite(movieID).subscribe((response) => {
			localStorage.setItem("user", JSON.stringify(response));
			this.getFavorites();
			this.snackBar.open("Added to Favorites.", "OK", {
				duration: 2000
			});
		});
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

			// Opens dialog
			this.snackBar.open("Removed from Favorites.", "OK", {
				duration: 2000
			});
		});
	};
};
