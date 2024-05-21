import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { HousingService } from '../housing.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[HousingService]
})
export class TableComponent implements OnInit{

  users: any[];

  addUserForm: FormGroup;
  
  constructor(private studentservice : HousingService,private modal:NgbModal, private fb: FormBuilder){
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });
  }

  get f() { return this.addUserForm.controls; }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.studentservice.addUser(this.addUserForm.value);
      this.loadUsers();
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  
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

    open(template:TemplateRef<any>) {
      this.modal.open(template);
      // modalRef.componentInstance.name = 'World';
    }


    // for normal crud

    // editingUser: any = null;
    // newUser: any = { id: null, name: '', email: '', phone: '', location:'' };
    // showAddForm: boolean = false;
    // editUser(user: any) {
    //   this.editingUser = { ...user }; // Create a copy of the user object to avoid modifying the original
    // }
  
    // saveUser() {
    //   this.studentservice.updateUser(this.editingUser);
    //   this.editingUser = null; // Clear the editing user
    // }
  
    // cancelEdit() {
    //   this.editingUser = null; // Clear the editing user
    // }
  
    // toggleAddForm() {
    //   this.showAddForm = !this.showAddForm;
    // }
  
    // addUser() {
    //   // Generate a unique ID for the new user
    //   this.newUser.id = this.users.length + 1;
    //   // Add the new user to the list
    //   this.studentservice.addUser(this.newUser);
    //   // Clear the form
    //   this.newUser = { id: null, name: '', email: '', phone: '' };
    //   // Reload users after addition
    //   this.loadUsers();
    // }
}


