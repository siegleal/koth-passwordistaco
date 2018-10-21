import { Component, Input, NgZone } from '@angular/core';
import { GapiService } from '../gapi.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private gapiService: GapiService, private ngZone: NgZone) {}

  

}
