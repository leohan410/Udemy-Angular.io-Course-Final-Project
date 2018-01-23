import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    // .then(user => {
    //   this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl') || '/']);
    // });
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  returnFromLoginRedirect() {
    this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.userService.save(result.user);
        this.router.navigate([this.route.snapshot.queryParamMap.get('returnUrl') || '/']);
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      }
      return Observable.of(null);
    });
  }

}
