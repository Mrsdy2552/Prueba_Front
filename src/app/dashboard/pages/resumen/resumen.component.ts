import { Component, Input, input, model, OnInit } from '@angular/core';
import { UserResponse } from '../../interfaces/reques-responsse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css',
})
export class ResumenComponent {
  @Input() constumer: UserResponse | undefined;
  constumerActive = model();

  onclick() {
    this.constumerActive.update((value) => !value);
  }
}
