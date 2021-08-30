import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private storageSub = new Subject<String>();
  private storageSubLocal = new Subject<String>();

  constructor() { }
  
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  watchLocalStorage(): Observable<any> {
    return this.storageSubLocal.asObservable();
  }

  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    this.storageSub.next(key);
  }

  removeItem(key) {
    sessionStorage.removeItem(key);
    this.storageSub.next(key);
  }

  setItemToLocal(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSubLocal.next(key);
  }

  removeItemFromLocal(key) {
    localStorage.removeItem(key);
    this.storageSubLocal.next(key);
  }
}
