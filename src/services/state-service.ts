import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

import {User} from "../models/user";

@Injectable()
export class StateService {
    private _user: User = null;
    private _eventEmitter: Observable<boolean>;
    private _observer: Observer<boolean>;

    constructor() {
        this._eventEmitter = Observable.create(observer => this._observer = observer );
    }

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
        this._observer.next(this.isLoggedIn);
    }

    get isLoggedIn(): boolean {
        return this._user !== null;
    }

    subscribe(next?, error?, complete?) {
        return this._eventEmitter.subscribe(next, error, complete);
    }

    logout(): void {
        this.user = null;
    }
}
