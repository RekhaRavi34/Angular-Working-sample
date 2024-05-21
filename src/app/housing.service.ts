import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
    
      private users = [
        { id: 1, name: 'Rekha', email:"rekharavi1997@gmail.com", phone:8056224832, location:"Chennai" },
        { id: 2, name: 'Ravi', email:"rekharavi17@gmail.com", phone:8056224832, location:"Chennai" },
        { id: 3, name: 'loshi', email:"rekharavi17@gmail.com", phone:8056224832, location:"Chennai" },
        { id: 4, name: 'nivi', email:"rekharavi173@gmail.com", phone:8056224832, location:"Chennai" }
      ];
    
      getUsers() {
        return this.users;
      }

      updateUser(updatedUser: any) {
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      }

      deleteUser(id: number) {
        this.users = this.users.filter(user => user.id !== id);
      }
      addUser(newUser: any) {
        this.users.push(newUser);
      }
}
