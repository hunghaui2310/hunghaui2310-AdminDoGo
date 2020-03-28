import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {OauthService} from "../../../service/oauth.service";
import {appConfig} from "../../../config/app.config";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router,
              private oauthService: OauthService) {
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): boolean{
    const isLogin = localStorage.getItem(appConfig.session);
    if(isLogin){
      return true;
    }
    //   this.oauthService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
