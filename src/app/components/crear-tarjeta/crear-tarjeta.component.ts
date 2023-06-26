import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit{
  titulo = 'Agregar tarjeta'
  id: string | undefined;
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private _tarjetaService: TarjetaService,
              private toastr: ToastrService){
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      cvv: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
  }
  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      this.titulo = 'Editar Tarjeta';
      this.id = data.id
      this.form.patchValue({
        titular:data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }

    guardarTarjeta(){
      if(this.id === undefined){
        this.agregarTarjeta();
      }else{
        this.editarTarjeta(this.id);
      }

      
    }

    editarTarjeta(id: string){
      this.loading = true;
      const TARJETA: any = {
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaExpiracion: this.form.value.fechaExpiracion,
        cvv: this.form.value.cvv,
        fechaActualizacion: new Date()
      }
      this._tarjetaService.editarTarjeta(id,TARJETA).then(()=>{
        this.loading = false;
        this.titulo = 'Agregar Tarjeta'
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!!','Tarjeta actualizada');
        this.form.reset();
      },error => {
        this.loading = false;
        this.toastr.error("Opss...ocurrio un error",'Error');
        console.log(error);
      });
    }

    agregarTarjeta(){
      this.loading = true;
      const TARJETA: TarjetaCredito = {
        titular: this.form.value.titular,
        numeroTarjeta: this.form.value.numeroTarjeta,
        fechaExpiracion: this.form.value.fechaExpiracion,
        cvv: this.form.value.cvv,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      this._tarjetaService.guardarTarjeta(TARJETA).then(()=>{
        console.log("tarjeta registrado")
        this.loading = false;
        this.toastr.success('La tarjeta fue resgistrada con exito!!','Tarjeta registrada');
        this.form.reset();
      },error => {
        this.loading = false;
        this.toastr.error("Opss...ocurrio un error",'Error');
        console.log(error);
      });
    }
}
