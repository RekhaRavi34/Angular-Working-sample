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
  isEditMode: boolean = false;
  editedUserId: number | null = null;
  modalRef: NgbModalRef | null = null;
  addUserForm: FormGroup;
  isUserFormVaild: boolean = false

  constructor(
    private modal: NgbModal,
    private studentservice: HousingService,
    private fb: FormBuilder
    
  ) { 
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.addUserForm.controls;
  }
  async onSubmit() {
    this.formSubmitted = true;
    this.usernameTaken = false;
    this.emailTaken = false;
    console.log(this.f['phone'].errors?.['required'] && this.formSubmitted)
    if (this.addUserForm.valid) {
      
      const newUser = this.addUserForm.value;
      console.log(newUser)
      if (
        this.isUsernameOrEmailTaken(
          newUser.name,
          newUser.email,
          this.editedUserId
        )
      ) {
        if (this.isUsernameTaken(newUser.name, this.editedUserId)) {
          this.usernameTaken = true;
        }
        if (this.isEmailTaken(newUser.email, this.editedUserId)) {
          this.emailTaken = true;
        }
      } else {
        this.isUserFormVaild=true;
        if (this.isEditMode && this.editedUserId !== null) {
          
          await this.studentservice.updateUser(newUser, this.editedUserId);
          await this.loadUsers();
        } else {
          try{
            await this.studentservice.addUser(newUser);
            await this.loadUsers();
          }catch(error){
            console.log(error);
          }
          console.log(this.studentservice.users);
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
    editedUserId: number | null
  ): boolean {
    return (
      this.isUsernameTaken(name, editedUserId) ||
      this.isEmailTaken(email, editedUserId)
    );
  }

  isUsernameTaken(name: string, editedUserId: number | null): boolean {
    return this.users.some(
      (user, index) => user.name === name && user.id !== editedUserId
    );
  }

  isEmailTaken(email: string, editedUserId: number | null): boolean {
    return this.users.some(
      (user, index) => user.email === email && user.id !== editedUserId
    );
  }

  async ngOnInit() {
   try{
    await this.loadUsers();
    console.log(this.users)
   }catch(error){
    console.log(error);
   }
  }
  
/// as promise is returned we use async and await in here.
  async loadUsers() {
    this.users  = await this.studentservice.fetchData();
  }
 
   async deleteUser() {
    try{
      await this.studentservice.deleteData(this.editedUserId);
      await this.loadUsers();
    }
    catch(error){
      console.log(error)
    }
    if (this.modalRef) {
      this.modalRef.close();
    }

  }

  async open(template: TemplateRef<any>, userId: number | null = null,action=null) {
    this.isEditMode = userId !== null;
    console.log(this.isEditMode);
    this.editedUserId = userId;
    if (this.isEditMode && userId !== null && action==="edit") {
      try{
        const user= await this.studentservice.singleUser(userId);
        this.addUserForm.patchValue(user[0]);
      }catch(error){
        console.log(error);
      }
      
    } else {
      this.addUserForm.reset();
    }

    // passing configuration to prevent modal from closing on keboard and clicking
    this.modalRef = this.modal.open(template, {backdrop: 'static',});
    // modalRef.componentInstance.name = 'World';
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.addUserForm.reset();
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
