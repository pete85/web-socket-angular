import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UsersData {
  phone: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  phone: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
  }

  ngOnInit(): void {
  }

  login() {
    this.dialogRef.close({phone: this.phone});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
