import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
@Input() editedUserId: number;
  @Input() editedUserName: string;

  editUser() {
    // Implement logic to edit the user using the editedUserId and editedUserName
    // You can emit an event to notify the parent component about the edited user
  }
}
