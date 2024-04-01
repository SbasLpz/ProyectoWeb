import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComestiblesComponent } from './crear-comestibles.component';

describe('CrearComestiblesComponent', () => {
  let component: CrearComestiblesComponent;
  let fixture: ComponentFixture<CrearComestiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearComestiblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearComestiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
