import { Component, OnInit, Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
	// Defines custom HTML element
	selector: "movie-genre",

	templateUrl: "./genre.component.html",
	styleUrl: "./genre.component.css"
})

export class GenreComponent implements OnInit {
	/**
	 * @constructor
	 * @param data - The data of the genre.
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA)

		public data: {
			Name: string,
			Description: string
		}
	) { };

	// Initializes component
	ngOnInit(): void {
	};
};
