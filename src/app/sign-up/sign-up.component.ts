import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  signupForm: FormGroup;
  formDataArray:any[] = [];
  isduplicate:string='';
  errorMessage:string=''
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]]
    });
  }

  get f() { return this.signupForm.controls; }


    onSubmit() {
      if (this.signupForm.valid) {
        const newUsername = this.signupForm.value.username;
        const isDuplicate = this.formDataArray.some(data => data.username === newUsername);
  
        if (isDuplicate) {
          this.errorMessage = 'Username already exists. Please choose a different username.';
        } else {
          this.formDataArray.push(this.signupForm.value);
          console.log('Form data stored:', this.formDataArray);
  
          // Reset the form and error message after successful submission
          this.signupForm.reset();
          this.errorMessage = '';
        }
      } else {
        alert('Please fill out the form correctly.');
      }
    }
}

