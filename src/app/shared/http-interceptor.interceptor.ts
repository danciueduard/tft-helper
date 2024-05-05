import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const getAllPosts = req.clone();
  return next(getAllPosts).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log("Unauthorized request:", err);
        }
      }
      return throwError(() => err);
    })
  );
};
