import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user-services.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { mockUserService } from '../../interfaces/mockResponse';

describe('HomeComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserServicesService>;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const spyUserService = jasmine.createSpyObj('UserServicesService', [
      'getUserById',
    ]);
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [{ provide: UserServicesService, useValue: spyUserService }],
    }).compileComponents();

    userServiceSpy = TestBed.inject(
      UserServicesService
    ) as jasmine.SpyObj<UserServicesService>;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('testin forms control typeDocument', () => {
    const typeDocument = component.form.controls['typeDocument'];
    typeDocument.setValue('Pasaporte');
    expect(component.form.invalid).toBeTrue();
  });
  it('testin forms control ', () => {
    const typeDocument = component.form.controls['typeDocument'];
    const documentNumber = component.form.controls['documentNumber'];
    typeDocument.setValue('Pasaporte');
    documentNumber.setValue('123456789');
    expect(component.form.invalid).toBeFalse();
  });

  it('should submit the form and handle success response', () => {
    userServiceSpy.getUserById.and.returnValue(of(mockUserService));
    const documentNumberControl = component.form.get('documentNumber');
    const typeDocumentControl = component.form.get('typeDocument');
    documentNumberControl?.setValue('23445322');
    typeDocumentControl?.setValue('CC');
    component.onSubmit();
    expect(component.constumerActive).toBe(true);
    expect(component.constumer).toEqual(mockUserService);
  });
  it('should submit the form and error response', () => {
    const errorResponse = { error: 'User not found' };
    userServiceSpy.getUserById.and.returnValue(throwError(errorResponse));
    const swalSpy = spyOn(Swal, 'fire');

    const documentNumberControl = component.form.get('documentNumber');
    const typeDocumentControl = component.form.get('typeDocument');
    documentNumberControl?.setValue('123456');
    typeDocumentControl?.setValue('CI');
    component.onSubmit();
    expect(component.constumerActive).toBe(false);

    expect(swalSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        icon: 'error',
        title: 'Lo Sentimos ',
        text: 'User not found',
      })
    );
  });

  it('should format document id number ', () => {
    const documentNumberControl = component.form.get('documentNumber');
    documentNumberControl?.setValue('23445322');
    component.formatDocumentNumber();
    expect(documentNumberControl?.value).toBe('23.445.322');
  });
});
