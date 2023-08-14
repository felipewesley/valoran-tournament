/**
 * ### Globally Unique Identifier - Guid
 * @class Guid
 */
export class Guid {

    /**
     * Create a new Guid
     * @returns {Guid}
     */
    public static newGuid(): Guid {

        return new Guid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = (c == 'x') ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        }));
    }

    /**
     * Gets a empty Guid
     * @returns {string}
     */
    public static get empty(): string {
        return '00000000-0000-0000-0000-000000000000';
    }

    /**
     * Test if a Guid is valid
     * @param {Guid} guid
     * @returns {boolean}
     */
    public static isValid(guid: Guid): boolean;
    /**
     * Test if a Guid is valid
     * @param {string} guid
     * @returns {boolean}
     */
    public static isValid(guid: string): boolean;
    public static isValid(guid: Guid|string): boolean {
        const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (guid instanceof Guid) {
            return validRegex.test(guid.toString());
        }
        return validRegex.test(guid);
    }

    private readonly value: string = this.empty;

    constructor(value?: string) {

        if (value) {
            if (Guid.isValid(value)) {
                this.value = value.toLowerCase();
            }
        }
    }

    /**
     * Gets a empty Guid
     * @returns {string}
     */
    public get empty(): string {
        return Guid.empty;
    }

    /**
     * Transform the Guid instance to string
     * @returns {string}
     */
    public toString() {
        return this.value;
    }

    /**
     * Transform the Guid instance to JSON
     * @returns {string}
     */
    public toJSON(): string {
        return this.value;
    }

    /**
     * Compare two Guids
     * @param guid
     * @returns {boolean}
     */
    public equals(guid: Guid): boolean {
        return this.toString() == guid?.toString();
    }

}
