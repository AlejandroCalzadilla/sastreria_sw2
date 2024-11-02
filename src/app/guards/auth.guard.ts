import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token =inject(AuthService)
  const router = inject(Router)
  if(token.gettoken()){
    return true
  }
   router.navigateByUrl('')
  //console.log(token.tokef(),'prueba')
  return false ;
};
