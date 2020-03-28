import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {OauthService} from "../../../service/oauth.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor{

  constructor(private oauthService: OauthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.oauthService.currentUserValue;
    if (currentUser && currentUser.token) {
      req = req.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      )
    }
    return next.handle(req);
  }

}
