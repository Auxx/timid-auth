export class User {
    constructor(protected _roles: string[] = []) {}

    get roles(): string[] {
        return this._roles;
    }

    is(role: string): boolean {
        for (let i of this._roles) {
            if (i === role) {
                return true;
            }
        }

        return false;
    }

    has(roles: string[]): boolean {
        for (let role of roles) {
            if (this.is(role)) {
                return true;
            }
        }

        return false;
    }
}
