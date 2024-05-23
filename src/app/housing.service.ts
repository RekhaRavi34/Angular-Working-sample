import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class HousingService {

  users: any[];

  // ngOnInit(): void {
  //   this.fetchData();
  //   console.log(this.users);
  // }

  async fetchData(){
   try{
    const response = await axios.get(`http://localhost:3000/users`);
    return response.data;
   }catch(error){
    console.log(error)
   }
  }

  async deleteData(id:number){
    try{
     await axios.delete(`http://localhost:3000/users/${id}`)
    }catch(error){
      console.log(error)
    }
  }

  async addUser(data){
    try{
      await axios.post('http://localhost:3000/users', data);
    }catch(error){
      console.log(error)
    }
  }

  async updateUser(data,userId:number){
    try{
      await axios.put(`http://localhost:3000/users/${userId}`, data);
    }
    catch(error){
      console.log(error);
    }
  }
  async singleUser(id){
    try{
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      return response.data;
    }catch(error){
      console.log(error)
    }
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
