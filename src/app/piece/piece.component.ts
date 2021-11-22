import { Component, OnInit, HostBinding, HostListener, Input } from '@angular/core';

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

    constructor() { }

    ngOnInit(): void {
        
    }

    @HostListener('dragstart', ['$event']) 
    handleDragStart(evt: DragEvent) {
    	evt?.dataTransfer?.setData('application/json', JSON.stringify({row:this.row, column:this.column}))
    }

}
