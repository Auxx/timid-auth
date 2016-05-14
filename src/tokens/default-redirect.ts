import {OpaqueToken} from "@angular/core";

/**
 * Configuration token used to identify default redirect link for unauthorized routes.
 *
 * ### Example (boots.ts)
 *
 * ```typescript
 * bootstrap(AppComponent, [
 *     ...
 *     provide(DefaultRedirect, {useValue: ["LoginPage"]})
 * ]);
 * ```
 *
 * @type {OpaqueToken}
 */
export const DefaultRedirect: OpaqueToken = new OpaqueToken("DefaultRedirect");
