import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTecnologiaComponent } from './crear-tecnologia.component';

describe('CrearTecnologiaComponent', () => {
  let component: CrearTecnologiaComponent;
  let fixture: ComponentFixture<CrearTecnologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTecnologiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
