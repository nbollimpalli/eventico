import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent {
  constructor(public dialogRef: MatDialogRef<TermsConditionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
