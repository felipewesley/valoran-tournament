import { MatDialogConfig } from "@angular/material/dialog";

/**
 * ### Dialog default config
 * - Team form
 */
const defaultConfig = {

    clone(): MatDialogConfig {

        return {
            width: '600px',
            maxWidth: '90vw',
            disableClose: true,
            panelClass: []
        };
    }

};

/**
 * #### Dialog Config
 * - Team form
 */
export const teamFormDialogConfig = {

    /**
     * Gets complete config
     * @returns {MatDialogConfig}
     */
    getConfig(): MatDialogConfig {

        const config = defaultConfig.clone();

        return config;
    }
}
