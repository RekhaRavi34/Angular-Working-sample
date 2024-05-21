import { Component, OnInit} from '@angular/core';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[HousingService]
})
export class TableComponent implements OnInit{

  users: any[];
  editingUser: any = null;
  newUser: any = { id: null, name: '', email: '', phone: '', location:'' };
  showAddForm: boolean = false;

  constructor(private studentservice : HousingService){}
    ngOnInit() {
      this.loadUsers();
    }
  
    loadUsers() {
      this.users = this.studentservice.getUsers();
    }

    deleteUser(user: any) {
      this.studentservice.deleteUser(user.id);
      this.loadUsers();
    }

    editUser(user: any) {
      this.editingUser = { ...user }; // Create a copy of the user object to avoid modifying the original
    }
  
    saveUser() {
      this.studentservice.updateUser(this.editingUser);
      this.editingUser = null; // Clear the editing user
    }
  
    cancelEdit() {
      this.editingUser = null; // Clear the editing user
    }
  
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    }
  
    addUser() {
      // Generate a unique ID for the new user
      this.newUser.id = this.users.length + 1;
      // Add the new user to the list
      this.studentservice.addUser(this.newUser);
      // Clear the form
      this.newUser = { id: null, name: '', email: '', phone: '' };
      // Reload users after addition
      this.loadUsers();
    }
}


