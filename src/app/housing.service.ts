import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  users: any[] = [];

  getUsers() {
    return this.users;
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  addUser(user: any) {
    this.users.push(user);
  }
  // updateUser(updatedUser: any) {
  //   const index = this.users.findIndex(user => user.id === updatedUser.id);
  //   if (index !== -1) {
  //     this.users[index] = updatedUser;
  //   }
  // }

  // addUser(newUser: any) {
  //   this.users.push(newUser);
  // }
}
