import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    website: '',
    nickname: '',
    email: '',
    password: '',
    theme: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  postUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + '/register',
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userprofile');
  }
  getAuthUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userauthprofile');
  }

  updateUserTheme(user : User){ //theme
    return this.http.post(environment.apiBaseUrl + '/updateTheme', user);
   }

  askAndGetBlog(user : User){
    return this.http.post(environment.apiBaseUrl + '/askAndGetBlog', user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setPassword(password: string, authCredentials) {
    this.getUserProfile;

    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
  requestReset(body) {
    return this.http.post(`${BASEURL}/forgot-password`, body);
  }

  responseReset(body) {
    return this.http.post(`${BASEURL}/reset-password`, body);
  }
  changePassword(body) {
    return this.http.post(`${BASEURL}/change-password`, body);
  }
  // requestResetOld(body) {
  //   return this.http.post(`${BASEURL}/req-reset-password`, body);
  // }
  setUserTheme(value){
    this.selectedUser.theme=value;
  }
}
