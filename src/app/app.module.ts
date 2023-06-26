import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';


import { AppComponent } from './app.component';
import { CrearTarjetaComponent } from './components/crear-tarjeta/crear-tarjeta.component';
import { ListarTarjetaComponent } from './components/listar-tarjeta/listar-tarjeta.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    CrearTarjetaComponent,
    ListarTarjetaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
