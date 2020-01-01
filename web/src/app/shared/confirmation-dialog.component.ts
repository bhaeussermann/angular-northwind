import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  public message: string;

  constructor(private _activeModal: NgbActiveModal)
  { }

  close(response: boolean) {
    this._activeModal.close(response ? 'yes' : 'no');
  }
}
