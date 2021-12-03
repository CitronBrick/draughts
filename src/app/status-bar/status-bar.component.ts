import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
	selector: 'app-status-bar',
	templateUrl: './status-bar.component.html',
	styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

	winner :string = '';
	message :string = '';

	constructor(private gameService :GameService) { }

	ngOnInit(): void {
		this.gameService.turn$.subscribe((turn :boolean)=> {
			if(!this.winner) {
				this.message = (turn?'White':'Black') + ' to play.';
			}
		})
		this.gameService.winner$.subscribe((winner)=> {
			this.message = winner + ' has won !!!';
		});
	}

}
