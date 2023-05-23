import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import {Driver} from 'src/app/models/driver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit{

  constructor(private driverService : DriverService, private modalService : NgbModal){}
  public pilotos : Driver[] = []

  inputName = ""
  inputLastName = ""
  inputAge : ""
  inputCarNumber = ""
  inputNationality = ""
  inputPosition = ""
  inputTeam = ""

  nameView = ""
  lastNameView = ""
  ageView = ""
  carNumberView = ""
  nationalityView = ""
  positionView = ""
  teamView = ""



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

  view(ver : any, p : Driver){

    this.nameView = p.name
    this.lastNameView = p.lastName
    this.ageView = p.age.toString()
    this.carNumberView = p.carNumber.toString()
    this.positionView = p.position.toString()
    this.nationalityView = p.nationality

    this.modalService.open(ver).result.then(() => {
      let piloto = new Driver()
      piloto.id = p.id
      piloto.name = this.nameView
      piloto.lastName = this.lastNameView
      piloto.age = parseInt(this.ageView)
      piloto.carNumber = parseInt(this.carNumberView)
      piloto.position = parseInt(this.positionView)
      piloto.nationality = this.nationalityView
      this.driverService.edit(piloto, p.id).subscribe(()=>{
        location.reload()
        alert("Modificacion Exitosa")
        location.reload
      }, error =>{
        console.error(error)
      })
    })
  }
}
