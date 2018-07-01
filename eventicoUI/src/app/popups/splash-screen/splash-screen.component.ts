import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent {
  constructor(public dialogRef: MatDialogRef<SplashScreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
