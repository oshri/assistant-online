import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from  'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';

import { iStore } from './iStore';

const state: iStore = {
    loggedinStatus: false,
    appHeaderTitle: '',
    appHeaderMode: 'maximize'
}

@Injectable()
export class Store {
    private subject = new BehaviorSubject<iStore>(state);
    private store = this.subject.asObservable().distinctUntilChanged();

    get value(){
        return this.subject.value;
    }

    select<T>(name: string) : Observable<T> {
        return this.store.pluck(name);
    }

    set(name: string, state: any){
        this.subject.next({
            ...this.value, [name]: state
        });
    }

}