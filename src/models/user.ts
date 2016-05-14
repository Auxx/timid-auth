/**
 * Basic User model with a list of roles to match against.
 * Roles are simple strings.
 * Feel free to extend to your needs: add new fields, methods, etc.
 */
export class User {
    /**
     * Class constructor.
     *
     * @param _roles a list of roles to which current User belongs to.
     */
    constructor(protected _roles: string[] = []) {}

    /**
     * Getter for roles list
     *
     * @returns {string[]}
     */
    get roles(): string[] {
        return this._roles;
    }

    /**
     * Checks is User belongs to a role.
     *
     * @param role a role to check for
     * @returns {boolean}
     */
    is(role: string): boolean {
        for (let i of this._roles) {
            if (i === role) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if User belongs to at least one of specified roles.
     *
     * @param roles a list of roles to check against.
     * @returns {boolean}
     */
    has(roles: string[]): boolean {
        for (let role of roles) {
            if (this.is(role)) {
                return true;
            }
        }

        return false;
    }
}
