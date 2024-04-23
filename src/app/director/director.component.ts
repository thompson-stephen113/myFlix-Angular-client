import { Component, OnInit, Inject } from "@angular/core";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
	// Defines custom HTML element
	selector: "movie-director",

	templateUrl: "./director.component.html",
	styleUrl: "./director.component.css"
})

export class DirectorComponent implements OnInit {
	/**
	 * @constructor
	 * @param data - The data of the director.
	 */
	constructor(
		@Inject(MAT_DIALOG_DATA)

		public data: {
			Name: string,
			Bio: string,
			Birth: string,
			Death: string
		}
	) { };

	// Initializes component
	ngOnInit(): void {
	};
};
