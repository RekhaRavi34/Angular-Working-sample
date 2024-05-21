import { Component } from '@angular/core';
import { HousingService } from 'src/app/housing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[HousingService]
})
export class HomeComponent {
  
  constructor(private studentservice : HousingService){
    
  }
}
