import { Coord } from './coord';


export interface Move {

	// row: number;
	// column :number;
	origin :Coord;
	destination :Coord;
	capture :false|Coord;
}
