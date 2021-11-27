import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

	@HostBinding('attr.draggable')
	draggable: boolean = true; 

	@HostBinding('class.piece')
	className: boolean = true;

	@Input()
	row:number = 0;

	@Input()
	column: number = 0;

	@Input()
	@HostBinding('attr.data-color')
	camp: string = 'w';

    constructor(private gameService :GameService) {
    	this.gameService.winner$.subscribe((winner :string)=>{
    		this.draggable = winner.length == 0;
    	});
    }

    ngOnInit(): void {
        
    }

    @HostListener('dragstart', ['$event']) 
    handleDragStart(evt: DragEvent) {
    	evt?.dataTransfer?.setData('application/json', JSON.stringify({row:this.row, column:this.column}))
    }

}
