import { Component, OnInit, Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
	// Defines custom HTML element
	selector: "movie-description",

	templateUrl: "./movie-description.component.html",
	styleUrl: "./movie-description.component.scss"
})

export class MovieDescriptionComponent implements OnInit {
	/**
	 * @constructor
	 * @param data - The data of the description.
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA)
		
		public data: {
			Description: string
		}
	) { };

	// Initializes component
	ngOnInit(): void {
	};
};
