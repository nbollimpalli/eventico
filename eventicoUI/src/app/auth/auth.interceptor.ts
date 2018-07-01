import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../event-user/shared/user.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/do';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService : UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var auth_token = '';
        if (localStorage.getItem('userToken') != null) {
            auth_token = "Bearer " + localStorage.getItem('userToken');
        }

        const clonedreq = req.clone({
            headers: req.headers.set("Authorization", auth_token)
        });

        return next.handle(clonedreq)
        .do(
        succ => { },
        err => {
            if (err.status === 401)
            {
                localStorage.removeItem('userToken');
                this.userService.updateProfile();
                this.router.navigateByUrl('/login');
            }
            else if(err.status === 403)
            {
                this.router.navigateByUrl('');
            }
        }
        );
    }
}
