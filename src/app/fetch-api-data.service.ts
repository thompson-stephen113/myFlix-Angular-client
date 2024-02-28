import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

// Declares the API URL that will provide data for the client app
const apiUrl = "YOUR_HOSTED_API_URL_HERE/";

@Injectable({
  	providedIn: "root"
})
export class UserRegistrationService {
	// Injects the HttpClient module to the constructor params
	// This will provide HttpClient to the entire class, making it available via this.http
  	constructor(private http: HttpClient) { }

	// Makes the API call for the "allows new users to register" endpoint
	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "users", userDetails).pipe(
			catchError(this.handleError)
		);
	};

	// Makes the API call for the user login endpoint
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "users", userDetails).pipe(
			catchError(this.handleError)
		);
	};

	// Makes the API call for the "route to list of all movies" endpoint
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

	// Makes the API call for the "route to data of a single movie by title" endpoint
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

	// Makes the API call for the "route to data about a director by name" endpoint
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

	// Makes the API call for the "route to data of a genre by name" endpoint
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

	// Makes the API call for the "gets a user by username" endpoint
	getUser(username: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Makes the API call for the user favorites
	getFavorites(username: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username + "/favorites-list", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Makes the API call for the "allows users to add movies to their favorites list" endpoint
	addFavorite(username: string, movieID: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username + "/favorites-list/" + movieID, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Makes the API call for the "allows existing users to update their info" endpoint
	updateUser(username: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username + "/update-info", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Makes the API call for the "allows user to remove movies from their favorites list" endpoint
	deleteFavorite(username: string, movieID: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username + "/favorites-list/" + movieID, {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Makes the API call for the "allows existing users to deregister their account" endpoint
	deleteUser(username: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http.get(apiUrl + "users/" + username + "/update-info", {headers: new HttpHeaders(
			{
				Authorization: "Bearer " + token,
			}
		)}).pipe(
			map(this.extractResponseData),
			catchError(this.handleError)
		);
	};

	// Non-typed response extraction
	private extractResponseData(res: any): any {
		const body = res;
		return body || { };
	}

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
