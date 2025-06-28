import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sugerencia } from './sugerencia';

describe('Sugerencia', () => {
  let component: Sugerencia;
  let fixture: ComponentFixture<Sugerencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sugerencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sugerencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
