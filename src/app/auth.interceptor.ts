import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor:HttpInterceptorFn = (request,next) => {
    const token = localStorage.getItem('authToken') ?? '';
    request = request.clone({
        setHeaders:{
            Authorization : token ? token : ''
        }
    });
    return next(request);
}