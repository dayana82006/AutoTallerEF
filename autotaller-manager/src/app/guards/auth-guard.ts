import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Si no hay token, redirige a login
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Token mal formado');

    // Base64 decode con soporte para base64url
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    const rolesClaim = payload['roles'] || payload['role'];
    
    const userRoles: string[] = Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim];

    // Verificar si esta ruta requiere roles específicos
    const allowedRoles = route.data['roles'] as string[] | undefined;

    if (allowedRoles && allowedRoles.length > 0) {
      const hasRole = userRoles.some(role => allowedRoles.includes(role));
      if (!hasRole) {
        router.navigate(['/unauthorized']); // o muestra un Swal
        return false;
      }
    }

    return true;

  } catch (error) {
    console.error('Error procesando el token JWT:', error);
    localStorage.removeItem('token'); 
    router.navigate(['/auth/login']);
    return false;
  }
};
