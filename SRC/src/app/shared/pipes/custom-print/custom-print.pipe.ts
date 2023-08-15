import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'customPrint',
    standalone: true
})
export class CustomPrintPipe implements PipeTransform {

	/**
	 * Constructor
	 */
    constructor() { }

	// --------------------------------------------------
	// Pipe transform implementation
	// --------------------------------------------------

    transform<T>(key: string|number, dataSource: T[], customKeyValue: `${string}:${string}`): string;
    transform<T>(key: string|number, dataSource: T[], customKeyValue: `${string}:${string}`): string {

        if (!key)
            return null;

        if (!dataSource)
            throw new Error(`Invalid data source`);

        if (Array.isArray(dataSource)) {

            if (!customKeyValue || !/[A-Za-z0-9]\:[A-Za-z]/.test(customKeyValue))
                throw new Error(`Identifier and value keys must be in "identifier:value" format`);

            const [identifierKey, valueKey] = customKeyValue.split(':') as [keyof T, keyof T];

            const item = dataSource.find(e => {

                if (!e)
                    return false;

                if (e[identifierKey] == key)
                    return true;

                return false;
            });

            if (!item)
                return null;

            switch (typeof item[valueKey]) {
                case "object":
                case "function":
                    return item[valueKey] as string;

                case "string":
                case "number":
                case "bigint":
                case "boolean":
                    return item[valueKey]?.toString();
                default:
                    return null;
            }
        }

        return null;
    }
}
