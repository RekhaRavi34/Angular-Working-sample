import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HousingService } from '../housing.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [HousingService],
})
export class TableComponent implements OnInit {
  users: any[];
  usernameTaken: boolean = false;
  emailTaken: boolean = false;
  formSubmitted: boolean = false;
  modalRef: NgbModalRef | null = null;
  addUserForm: FormGroup;
  isEditMode: boolean = false;
  editedUserIndex: number | null = null;

  constructor(
    private studentservice: HousingService,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.usernameTaken = false;
    this.emailTaken = false;

    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;
      if (
        this.isUsernameOrEmailTaken(
          newUser.name,
          newUser.email,
          this.editedUserIndex
        )
      ) {
        if (this.isUsernameTaken(newUser.name, this.editedUserIndex)) {
          this.usernameTaken = true;
        }
        if (this.isEmailTaken(newUser.email, this.editedUserIndex)) {
          this.emailTaken = true;
        }
      } else {
        if (this.isEditMode && this.editedUserIndex !== null) {
          this.users[this.editedUserIndex] = newUser;
        } else {
          this.users.push(newUser);
        }
        this.formSubmitted = false;
        if (this.modalRef) {
          this.modalRef.close();
        }
      }
    }
  }

  isUsernameOrEmailTaken(
    name: string,
    email: string,
    editedUserIndex: number | null
  ): boolean {
    return (
      this.isUsernameTaken(name, editedUserIndex) ||
      this.isEmailTaken(email, editedUserIndex)
    );
  }

  isUsernameTaken(name: string, editedUserIndex: number | null): boolean {
    return this.users.some(
      (user, index) => user.name === name && index !== editedUserIndex
    );
  }

  isEmailTaken(email: string, editedUserIndex: number | null): boolean {
    return this.users.some(
      (user, index) => user.email === email && index !== editedUserIndex
    );
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

  open(template: TemplateRef<any>, userIndex: number | null = null) {
    this.isEditMode = userIndex !== null;
    this.editedUserIndex = userIndex;
    if (this.isEditMode && userIndex !== null) {
      const user = this.users[userIndex];
      this.addUserForm.patchValue(user);
    } else {
      this.addUserForm.reset();
    }
    this.modalRef = this.modal.open(template);
    // modalRef.componentInstance.name = 'World';
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
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
