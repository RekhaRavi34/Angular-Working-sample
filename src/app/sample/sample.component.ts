import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  ngOnInit(): void {
    this.fetchData()
  }
  users:[];
 async fetchData(){
    const response = await axios.get(
      `http://localhost:3000/users`
  );
  console.log(response);
  }
  
 
}
