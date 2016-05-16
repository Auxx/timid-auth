import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

import {User} from "../models/user";

/**
 * This service is used across timid-auth to manage the current state of authentication.
 * It provides subscription to state changes, allows to set User data or log out the User and
 * provides a helper to check login state.
 *
 * Setting User to NULL will set isLoggedIn to FALSE.
 */
@Injectable()
export class StateService {
    private _user: User = null;
    private _eventEmitter: Observable<boolean>;
    private _observer: Observer<boolean>;

    constructor() {
        this._eventEmitter = Observable.create(observer => this._observer = observer );
    }

    /**
     * Returns current User instance.
     *
     * @returns {User}
     */
    get user(): User {
        return this._user;
    }

    /**
     * Updates User instance.
     *
     * @param user
     */
    set user(user: User) {
        this._user = user;
        this._observer.next(this.isLoggedIn);
    }

    /**
     * Checks if application is running in logged in state.
     *
     * @returns {boolean}
     */
    get isLoggedIn(): boolean {
        return this._user !== null;
    }

    /**
     * Subscribe to authentication state changes. Callbacks will receive isLoggedIn
     * as the only argument.
     *
     * @param next
     * @param error
     * @param complete
     * @returns {Subscription}
     */
    subscribe(next?, error?, complete?) {
        return this._eventEmitter.subscribe(next, error, complete);
    }

    /**
     * A shortcut to StateService.user = null.
     */
    logout(): void {
        this.user = null;
    }
}
