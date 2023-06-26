import { Component, OnInit } from '@angular/core';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listTarjetas: TarjetaCredito[] = [];
  constructor(private _tarjetaService: TarjetaService){


  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }
  

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe(data => {
      this.listTarjetas = [];
      console.log(data)
      data.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.id,
          titular: element.titular,
          numeroTarjeta: element.numeroTarjeta,
          cvv: element.cvv,
          fechaExpiracion: element.fechaExpiracion,
          fechaCreacion: element.fechaCreacion,
          fechaActualizacion: element.fechaActualizacion
        })
        console.log(this.listTarjetas)
      });

    })
  }

  eliminarTarjeta(id?: string){
    this._tarjetaService.eliminarTarjeta(id).then(() =>{

    },error =>{
      console.log(error)
    })
  }

  actualizarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEdit(tarjeta);
  }


}
