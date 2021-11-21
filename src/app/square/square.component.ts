import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {


    @Input()
    row:number = 0;

    @Input()
    column:number = 0;

    @Input()
    @HostBinding('attr.data-piece')
    piece:string = '';

    @HostBinding('attr.data-bgcolor')
    bgColor: string = '';

    constructor() {
    }

    ngOnInit(): void {
        this.bgColor = (((this.row%2) == (this.column%2))?'red':'black');
        console.log(this.piece);
    }



}
