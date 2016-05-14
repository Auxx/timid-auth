import {ViewContainerRef, TemplateRef, Directive} from "@angular/core";

import {StateService} from "../services/state-service";
import {User} from "../models/user";

@Directive({
    selector: "[restrictTo]",
    inputs: ["restrictTo"]
})
export class RestrictTo {
    private roles: string[] = [];
    private prevIsAllowed: boolean = null;

    constructor(
        private _viewContainer: ViewContainerRef,
        private _templateRef: TemplateRef<Object>,
        private stateService: StateService
    ) {
        this.stateService.subscribe(this.updateState);
    }

    set restrictTo(roles: any) {
        if (typeof roles === "string") {
            this.roles = [roles];
        }
        else if (roles instanceof Array) {
            this.roles = roles;
        }
        else {
            this.roles = [];
        }

        this.updateState(this.stateService.isLoggedIn);
    }

    private updateState(isLoggedIn: boolean): void {
        let isAllowed = isLoggedIn;

        if (isAllowed) {
            let user: User = this.stateService.user;
            isAllowed = user.has(this.roles);
        }

        if (isAllowed !== this.prevIsAllowed) {
            this.prevIsAllowed = isAllowed;

            if (isAllowed) {
                this._viewContainer.createEmbeddedView(this._templateRef);
            }
            else {
                this._viewContainer.clear();
            }
        }
    }
}
