import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-jsontrans',
  templateUrl: './jsontrans.component.html',
  styleUrls: ['./jsontrans.component.scss']
})
export class JsontransComponent implements OnInit{
  
  data: any = this.dataService.data;
  distributorTransaction:any[];
  nondistributorTransaction:any[];
  
  constructor(private dataService: DataService){console.log(this.data)}

  ngOnInit(): void {
    this.segregateFunction();
  }
   segregateFunction(){
    const transactions : { [key: number]: any [] }  =this.data.workflowHistory.transactions;
    console.log(transactions);
    for( const [key,value] of Object.entries(transactions)){
     
     const roles= value[0].generatedByRole;
     if(roles==="distributor"){
      this.distributorTransaction?.push(value[0])
     }else{
      this.nondistributorTransaction?.push(value[0])
     }
  }
  }

  
}