import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  confirm(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      background: '#212529',
      color: '#fff'
    }).then(result => result.isConfirmed);
  }

  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3085d6',
      background: '#212529',
      color: '#fff'
    });
  }

  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33',
      background: '#212529',
      color: '#fff'
    });
  }

  info(title: string, text?: string) {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3085d6',
      background: '#212529',
      color: '#fff'
    });
  }
}
