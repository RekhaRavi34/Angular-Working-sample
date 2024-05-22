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
    const halfBeforeTheUnwantedElement = this.users.slice(0, id)

const halfAfterTheUnwantedElement = this.users.slice(id+1);

this.users= halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement);
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
