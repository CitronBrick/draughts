import { Component, OnInit, OnDestroy, HostBinding, HostListener, Input } from '@angular/core';
import { GameService } from '../game.service';
import { SettingsService } from '../settings.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit, OnDestroy {

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

    subscriptionList : Subscription[] = [];

    constructor(private gameService :GameService, private settingsService :SettingsService) {
    }

    ngOnInit(): void {
    	let winnerSub : Subscription = this.gameService.winner$.subscribe((winner :string)=>{
    		this.draggable = winner.length == 0;
    	});
    	// subscribe should happen in ngOnInit as
    	// piece color depends on camp which is @Input()
    	let whitePieceColorSub : Subscription = this.settingsService.whitePieceColor$.subscribe((color)=>{
    		if(this.camp.toLowerCase() == 'w') {
    			this.whitePieceColor = color;
    		}
    	});
    	let blackPieceColorSub: Subscription = this.settingsService.blackPieceColor$.subscribe((color)=>{
    		if(this.camp.toLowerCase() == 'b') {
    			this.blackPieceColor = color;
    		}
    	});

        this.subscriptionList = [winnerSub,whitePieceColorSub,blackPieceColorSub];
    }

    @HostBinding('style.backgroundColor')
    get backgroundColor() : string {
    	return this.camp.toLowerCase()=='w'?this.whitePieceColor:this.blackPieceColor;
    }

    @HostListener('dragstart', ['$event']) 
    handleDragStart(evt: DragEvent) {
    	evt?.dataTransfer?.setData('application/json', JSON.stringify({row:this.row, column:this.column}))
    }


    ngOnDestroy() :void {
        this.subscriptionList.forEach((sub :Subscription) =>{
            sub.unsubscribe();
        });
    }

}
