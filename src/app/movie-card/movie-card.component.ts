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
	styleUrl: "./movie-card.component.css"
})
export class MovieCardComponent implements OnInit {
	movies: any[] = [];
	user: any = {};
	userData = { Username: "", FavoriteMovies: []};
	FavoriteMovies: any[] = [];
	isFavoriteMovie: boolean = false;

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar
	) { };

	ngOnInit(): void {
		this.getMovies();
		this.getFavorites();
	};

	getMovies(): void {
		this.fetchApiData.getAllMovies().subscribe((response: any) => {
			this.movies = response;
			console.log(this.movies);
			return this.movies;
		});
	};

	openDescription(description: string): void {
		this.dialog.open(MovieDescriptionComponent, {
			data: {
				Description: description,
			},
			width: "500px"
		});
	};

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

	openGenre(name: string, description: string): void {
		this.dialog.open(GenreComponent, {
			data: {
				Name: name,
				Description: description
			},
			width: "500px"
		});
	};
	
	getFavorites(): void {
		this.user = this.fetchApiData.getUser();
		this.userData.FavoriteMovies = this.user.FavoriteMovies;
		this.FavoriteMovies = this.user.FavoriteMovies;
		console.log("Favorite Movies: ", this.FavoriteMovies);
	};

	isFavorite(movie: any): any {
		const movieID = movie._id;

		if (this.FavoriteMovies.some((movie) => movie === movieID)) {
			return true;
		} else {
			return false;
		};
	};

	addFavorite(movie: string): void {
		this.user = this.fetchApiData.getUser();
		this.userData.Username = this.user.Username;
		this.fetchApiData.addFavorite(movie).subscribe((result) => {
			localStorage.setItem("user", JSON.stringify(result));
			this.getFavorites();
			this.snackBar.open("Added to Favorites.", "OK", {
				duration: 2000
			});
		});
	};

	deleteFavorite(movie: string): void {
		this.user = this.fetchApiData.getUser();
		this.userData.Username = this.user.Username;
		this.fetchApiData.deleteFavorite(movie).subscribe((result) => {
			localStorage.setItem("user", JSON.stringify(result));
			this.getFavorites();
			this.snackBar.open("Removed from Favorites.", "OK", {
				duration: 2000
			});
		});
	};
};
