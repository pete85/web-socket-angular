import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

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
