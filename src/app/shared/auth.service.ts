import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/user.model';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName?: string;
  role?: string[];
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });
  options = { headers: this.headers };

  constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) { }

  signIn(credentials: ISignInCredentials): Observable<any> {
    // Firebase cnx
    // return from(this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password));
    return this.httpClient.post(`${environment.serverUrl}/api/auth/signin`, credentials, this.options);
  }

  signOut() {
    localStorage.removeItem('connected_user');
    return from(this.afAuth.auth.signOut());
  }

  register(credentials: ICreateCredentials) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        () => {
          this.afAuth.auth.currentUser.updateProfile({ displayName: credentials.displayName });
          this.afAuth.auth.updateCurrentUser(this.afAuth.auth.currentUser);
        }
      )
    );
  }

  registerAdmin(credentials: ICreateCredentials):Observable<any> {
    credentials.role = ['admin'];
    return this.httpClient.post(`${environment.serverUrl}/api/auth/signup`, credentials, this.options);
  }

  sendPasswordEmail(email) {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  resetPassword(credentials: IPasswordReset) {
    return from(this.afAuth.auth.confirmPasswordReset(credentials.code, credentials.newPassword));
  }

  get user(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  get connectedUser(): IUser {
      const user: IUser =JSON.parse(localStorage.getItem('connected_user'));
      return user;
  }

}
