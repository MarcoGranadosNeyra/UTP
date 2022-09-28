import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)public mensaje: string) { }

  ngOnInit() {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  
  confirmado(): void {
    this.dialogo.close(true);
  }

}
