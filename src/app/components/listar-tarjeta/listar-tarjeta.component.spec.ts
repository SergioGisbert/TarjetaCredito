import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTarjetaComponent } from './listar-tarjeta.component';

describe('ListarTarjetaComponent', () => {
  let component: ListarTarjetaComponent;
  let fixture: ComponentFixture<ListarTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarTarjetaComponent]
    });
    fixture = TestBed.createComponent(ListarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
