import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ThousandsPipePipe } from '../../pipes/thousands-pipe.pipe';
import { UserServicesService } from '../../services/user-services.service';
import Swal from 'sweetalert2';
import { ResumenComponent } from '../resumen/resumen.component';
import { NavigationExtras, Router } from '@angular/router';
import { UserResponse } from '../../interfaces/reques-responsse';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, ResumenComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  form: FormGroup;

  private userService = inject(UserServicesService);
  constumer: UserResponse | undefined;
  constumerActive: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  formatDocumentNumber(): void {
    const control = this.form.get('documentNumber');
    if (control) {
      const value = control.value.replace(/\D/g, '');
      control.setValue(this.addThousandSeparators(value), {
        emitEvent: false,
      });
    }
  }

  addThousandSeparators(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  onSubmit() {
    const documentNumber = this.form.get('documentNumber');
    const typeDocument = this.form.get('typeDocument')?.value;
    const documentWithoutDots = documentNumber?.value.replace(/\./g, '');

    const user = this.userService
      .getUserById(documentWithoutDots, typeDocument)
      .subscribe({
        next: (rest) => {
          this.constumerActive= true;
          this.constumer = rest;
        },
        error: (msg) => {
          this.constumer = undefined;
          Swal.fire({
            icon: 'error',
            title: 'Lo Sentimos ',
            text: msg.error,
          });
        },
      });
  }
}
