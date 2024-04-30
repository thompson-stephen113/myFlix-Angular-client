import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";


// Declares the API URL that will provide data for the client app
const apiUrl = "https://myflix-db-app-24338506cd5a.herokuapp.com/";

@Injectable({
  	providedIn: "root"
})

export class FetchApiDataService {
	/**
	 * @constructor
	 * @param {HttpClient} http - The service that makes HTTP requests.
	 */
	constructor(
		private http: HttpClient
	) { };

	/**
	 * Makes the API call for the "allows new users to register" endpoint
	 * @function
	 * @name userRegistration
	 * @param {any} userDetails - The details of the user.
	 * @returns {Observable<any>} - The Observable for the API response.
	 */
	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "users", userDetails).pipe(
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the user login endpoint
	 * @function
	 * @name userLogin
	 * @param {any} userDetails - The details of the user. 
	 * @returns {Observable<any>} - The Observable for the API response.
	 */
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "login", userDetails).pipe(
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "route to list of all movies" endpoint
	 * @function
	 * @name getAllMovies
	 * @returns {Observable<any>} - The Observable for the API response.
	 */
	getAllMovies(): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "movies", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "route to data of a single movie by title" endpoint
	 * @function
	 * @name getMovie
	 * @param {String} title - The title of the movie.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	getMovie(title: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "movies/" + title, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "route to data about a director by name" endpoint
	 * @function
	 * @name getDirector
	 * @param {String} director - The name of the director.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	getDirector(director: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "movies/directors/" + director, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "route to data of a genre by name" endpoint
	 * @function
	 * @name getGenre
	 * @param {String} genre - The name of the genre.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	getGenre(genre: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "movies/genre/" + genre, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "gets a user by username" endpoint
	 * @function
	 * @name getUser
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	getUser(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		return user;
	  };

	/**
	 * Makes the API call for the user favorites
	 * @function
	 * @name getFavorites
	 * @param {any} userDetails - The user the Favorites list belongs to.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	getFavorites(userDetails: any): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + userDetails.Username + "/favorites-list", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "allows users to add movies to their favorites list" endpoint
	 * @function
	 * @name addFavorite
	 * @param {String} movieID - The ID of the movie being added to Favorites.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	addFavorite(movieID: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + user.Username + "/favorites-list/" + movieID, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "allows existing users to update their info" endpoint
	 * @function
	 * @name updateUser
	 * @param {any} userDetails - The user whose details are being updated.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	updateUser(userDetails: any): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + userDetails.Username + "/update-info", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "allows user to remove movies from their favorites list" endpoint
	 * @function
	 * @name deleteFavorite
	 * @param {String} movieID - The ID of the movie being removed from Favorites.
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	deleteFavorite(movieID: string): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + user.Username + "/favorites-list/" + movieID, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Makes the API call for the "allows existing users to deregister their account" endpoint
	 * @function
	 * @name deleteUser
	 * @returns {Observable<any>} - The Observable of the API response.
	 */
	deleteUser(): Observable<any> {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + user.Username + "/update-info", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	/**
	 * Non-typed response extraction
	 * @function
	 * @name extractResponseData
	 * @param {any} res - The API response.
	 * @returns {any} - The extracted response data.
	 */
	private extractResponseData(res: any): any {
		const body = res;
		return body || { };
	}

	/**
	 * Error handler for HTTP requests.
	 * @function
	 * @name handleError
	 * @param {HttpErrorResponse} error - The HTTP error response.
	 * @returns {any} - The details of the error.
	 */
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error("Some error occurred: ", error.error.message);
		} else {
			console.error(
				`Error Status code ${error.status}, ` +
				`Error body is: ${error.error}`
			);
		}

		return throwError(
			"Something bad happened; please try again later."
		)
	}
}
