import {ViewContainerRef, DynamicComponentLoader, Directive, Inject} from "@angular/core";
import {Router, RouterOutlet, ComponentInstruction} from "@angular/router-deprecated";

import {DefaultRedirect} from "../tokens/default-redirect";
import {StateService} from "../services/state-service";
import {User} from "../models/user";

/**
 * Use this instead of Angular's <router-outlet> to handle role based access restrictions
 * to specified routes. To configure access, add restrictTo key to the route data:
 *
 * ```typescript
 * @RouteConfig([
 *     ...
 *     {path: "/restricted-page", name: "RestrictedPage", component: RestrictedPageComponent, data: {restrictTo: ["USER_ROLE"], redirectTo: "[LoginPage]"}},
 * ])
 * ```
 * It is possible restrict to a single role passed as a string or multiple roles
 * passed as an array of strings. The redirectTo key is optional.
 *
 * If current User is allowed to visit the route, default <router-outlet> implementation
 * is invoked, otherwise the client is redirected to a URL specified by either redirectTo
 * parameter in route data or to a DefaultRedirect provided by app configuration.
 *
 * Restricted routes are non-reusable.
 */
@Directive({
    selector: "auth-router-outlet"
})
export class AuthRouterOutlet extends RouterOutlet {
    private parentRouter: Router;
    private defaultRedirect: any;

    constructor(
        _viewContainerRef: ViewContainerRef,
        _loader: DynamicComponentLoader,
        _parentRouter: Router,
        nameAttr: string,
        @Inject(DefaultRedirect) defaultRedirect: any,
        private stateService: StateService
    ) {
        super(_viewContainerRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.defaultRedirect = defaultRedirect;
    }

    activate(nextInstruction: ComponentInstruction): Promise<any> {
        this.processRestriction(nextInstruction.routeData.data);
        return super.activate(nextInstruction);
    }

    routerCanReuse(nextInstruction: ComponentInstruction): Promise<boolean> {
        if (nextInstruction.routeData.data.hasOwnProperty("restrictTo")) {
            return new Promise<boolean>(resolve => resolve(false) );
        }
        else {
            return super.routerCanReuse(nextInstruction);
        }
    }

    private processRestriction(data: any): void {
        if (data.hasOwnProperty("restrictTo")) {
            let user: User = this.stateService.user;
            let isAllowed: boolean = this.stateService.isLoggedIn;

            if (isAllowed) {
                let roles: string[] = [];
                let restrictTo = data["restrictTo"];

                if (typeof restrictTo === "string") {
                    roles.push(restrictTo);
                }
                else if (restrictTo instanceof Array) {
                    roles = restrictTo;
                }

                isAllowed = user.has(roles);
            }

            if (!isAllowed) {
                this.parentRouter.navigate(data.hasOwnProperty("redirectTo") ? data["redirectTo"] : this.defaultRedirect);
            }
        }
    }
}

