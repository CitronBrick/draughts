import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { distinct, Subscription } from 'rxjs';

@Component({
    selector: 'app-settings-bar',
    templateUrl: './settings-bar.component.html',
    styleUrls: ['./settings-bar.component.css']
})
export class SettingsBarComponent implements OnInit {

    whitePieceColor: FormControl = new FormControl('');
    blackPieceColor :FormControl = new FormControl('');
    whiteSquareColor :FormControl = new FormControl('');
    blackSquareColor :FormControl = new FormControl('');
    squareSize :FormControl = new FormControl('');

    subscriptionList : Subscription[] = [];

    constructor(private settingsService :SettingsService) {
        
    }


    /* distinct is used to avoid infinite sync between SettingsService & FormControl */
    ngOnInit(): void {

        this.subscriptionList = [];

        this.subscriptionList.push(this.settingsService.whitePieceColor$.pipe(distinct()).subscribe((color)=>{
            this.whitePieceColor.setValue(color);       
        }));

        this.subscriptionList.push(this.whitePieceColor.valueChanges.subscribe((color)=> {
            this.settingsService.whitePieceColor$.next(color);
        }));

        this.subscriptionList.push(this.settingsService.blackPieceColor$.pipe(distinct()).subscribe((color)=>{
            this.blackPieceColor.setValue(color);
        }));


        this.subscriptionList.push(this.blackPieceColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackPieceColor$.next(color);
        }));

        this.subscriptionList.push(this.settingsService.whiteSquareColor$.pipe(distinct()).subscribe((color)=>{
            this.whiteSquareColor.setValue(color);
        }));

        this.subscriptionList.push(this.whiteSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.whiteSquareColor$.next(color);
        }));

        this.subscriptionList.push(this.settingsService.blackSquareColor$.pipe(distinct()).subscribe((color)=>{
            this.blackSquareColor.setValue(color);
        }));

        this.subscriptionList.push(this.blackSquareColor.valueChanges.subscribe((color)=>{
            this.settingsService.blackSquareColor$.next(color);
        }));

        this.subscriptionList.push(this.settingsService.squareSize$.pipe(distinct()).subscribe((size)=>{
            this.squareSize.setValue(size);
        }));

        this.subscriptionList.push(this.squareSize.valueChanges.subscribe((size)=>{
            this.settingsService.squareSize$.next(size);
        }));
    }


    ngOnDestroy() :void {
        this.subscriptionList.forEach((sub:Subscription) =>{
            sub.unsubscribe();
        });
    }

    

}
