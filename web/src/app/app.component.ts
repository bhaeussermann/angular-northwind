import { Component } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    this.setupModalCloseAnimation();
  }

  private setupModalCloseAnimation() {
    ['close', 'dismiss'].forEach(functionName => {
      NgbModalRef.prototype[functionName + '-base'] = NgbModalRef.prototype[functionName];
      NgbModalRef.prototype[functionName] = function(reason: string) {
        document.querySelector('.modal-backdrop').classList.remove('show');
        document.querySelector('.modal').classList.remove('show');
        setTimeout(() => {
            this[functionName + '-base'](reason);
        }, 250);
      };
    });
  }
}
