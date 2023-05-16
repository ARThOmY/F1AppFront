import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import {Driver} from 'src/app/models/driver';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit{

  constructor(private driverService : DriverService){}
  public pilotos : Driver[] = []

  inputName = ""
  inputLastName = ""
  inputAge : ""
  inputCarNumber = ""
  inputNationality = ""
  inputPosition = ""
  inputTeam = ""

  ngOnInit(): void {
      this.driverService.getAll().subscribe(response => {
        this.pilotos = response
      }, error =>{
        alert("Error")
      })
  }

  delete(id : number){
    this.driverService.delete(id).subscribe(()=>{
      location.reload()
      alert("Baja Exitosa")
    }, error =>{
      console.error(error)
    })
  }
  add(){ 
    let piloto = new Driver()
    piloto.name = this.inputName
    piloto.lastName = this.inputLastName
    piloto.age = parseInt(this.inputAge)
    piloto.carNumber = parseInt(this.inputCarNumber)
    piloto.position = parseInt(this.inputPosition)
    piloto.nationality = this.inputNationality
    this.driverService.add(piloto, parseInt(this.inputTeam) ).subscribe(()=>{
      location.reload()
      alert("Alta Exitosa")
      location.reload
    }, error =>{
      console.error(error)
    })
  }
}
