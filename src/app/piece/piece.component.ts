import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';
import { GameService } from '../game.service';
import { SettingsService } from '../settings.service';


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

	whitePieceColor: string='';
	blackPieceColor:string = '';

    constructor(private gameService :GameService, private settingsService :SettingsService) {
    	this.gameService.winner$.subscribe((winner :string)=>{
    		this.draggable = winner.length == 0;
    	});
    }

    ngOnInit(): void {
    	// subscribe should happen in ngOnInit as
    	// piece color depends on camp which is @Input()
    	this.settingsService.whitePieceColor$.subscribe((color)=>{
    		if(this.camp.toLowerCase() == 'w') {
    			this.whitePieceColor = color;
    		}
    	});
    	this.settingsService.blackPieceColor$.subscribe((color)=>{
    		if(this.camp.toLowerCase() == 'b') {
    			this.blackPieceColor = color;
    		}
    	});
    }

    @HostBinding('style.backgroundColor')
    get backgroundColor() : string {
    	return this.camp.toLowerCase()=='w'?this.whitePieceColor:this.blackPieceColor;
    }

    @HostListener('dragstart', ['$event']) 
    handleDragStart(evt: DragEvent) {
    	evt?.dataTransfer?.setData('application/json', JSON.stringify({row:this.row, column:this.column}))
    }

}
