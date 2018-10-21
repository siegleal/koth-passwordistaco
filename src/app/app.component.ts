import { Component, OnInit, NgZone } from '@angular/core';
import { GapiService } from './gapi.service';

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'koth-passwordistaco';
  signedIn: boolean;
  profile: any;
  apiLoaded: boolean = false;
  apiInit: boolean = false;
  googleAuth: any;

  constructor(private gapiService: GapiService, private ngZone: NgZone){}

  ngOnInit() {
    this.gapiService.loadGapi().then(() => {
      this.apiLoaded = true;
      console.log("loaded api");
      this.gapiService.initAuth().then(googleAuth => {
        this.apiInit = true;
        console.log("init api");
        this.profile = googleAuth.currentUser.get().getBasicProfile();
      }
    });
  }

public signIn(): void {
    this.gapiService.loadGapi().then(() => {
      this.gapiService.initAuth().then(googleAuth => {
            googleAuth.signIn().then(() =>{
              this.ngZone.run(() => {
                this.profile = googleAuth.currentUser.get().getBasicProfile();
                console.log('Signed in as ' + this.profile.getName());
              });
            })
        });
    });
  }

  public signOut(): void {
    this.gapiService.loadGapi().then(() => {
      this.gapiService.initAuth().then(googleAuth => {
        googleAuth.signOut();
        console.log('Signing out');
        this.profile = null;
      }
    })
  }

}