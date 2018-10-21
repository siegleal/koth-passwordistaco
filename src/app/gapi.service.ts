import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  constructor(private ngZone: NgZone) { }
  
  public initAuth(): Promise<any> {
    var client_id = '802811959703-grc5u6gcehhdn4nurrmjfllgrf7takuj.apps.googleusercontent.com';

    return new Promise((resolve, reject) =>{
      this.ngZone.run(() => {
        gapi.auth2.init({client_id: client_id}).then(resolve,reject);
      })
    });
  }

  public loadGapi(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        gapi.load('auth2', {
          callback: resolve,
          onerror: reject,
          timeout: 1000, // 5 seconds.
          ontimeout: reject
        });
      });
    });
  }
}
