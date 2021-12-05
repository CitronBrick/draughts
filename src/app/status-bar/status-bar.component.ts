import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-status-bar',
	templateUrl: './status-bar.component.html',
	styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit, OnDestroy {

	winner :string = '';
	message :string = '';

	subscriptionList : Subscription[] = [];

	constructor(private gameService :GameService) { }

	ngOnInit(): void {
		let turnSub :Subscription  = this.gameService.turn$.subscribe((turn :boolean)=> {
			if(!this.winner) {
				this.message = (turn?'White':'Black') + ' to play.';
			}
		})
		let winnerSub :Subscription = this.gameService.winner$.subscribe((winner)=> {
			this.winner = winner;
			this.message = winner + ' has won !!!';
		});

		this.subscriptionList = [turnSub,winnerSub];
	}

	@HostBinding('class.won')
	get won() :boolean{
		return  this.winner != '';
	}

	ngOnDestroy() :void {
		this.subscriptionList.forEach((sub:Subscription)=>{
			sub.unsubscribe();
		});
	}

}
