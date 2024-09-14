import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenComponent } from './resumen.component';
import { UserResponse } from '../../interfaces/reques-responsse';

describe('ResumenComponent', () => {
  let component: ResumenComponent;
  let fixture: ComponentFixture<ResumenComponent>;
  const mockResponse = {
    id: 23445322,
    documentType: 'pasaporte',
    firstName: 'Prueba',
    middleName: 'sin traer',
    firstSurname: '',
    secondLastName: 'test',
    address: 'Calle 125 b este ',
    city: 'soacha',
    phone: 3002837056,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should receive constumer input correctly', () => {
    const mockUser: UserResponse = mockResponse;
    component.constumer = mockUser;
    fixture.detectChanges();
    expect(component.constumer).toEqual(mockUser);
  });
});
