import { MatDialogConfig } from "@angular/material/dialog";

/**
 * ### Dialog default config
 * - Tournament setup
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
 * - Tournament setup
 */
export const tournamentSetupDialogConfig = {

    /**
     * Gets complete config
     * @returns {MatDialogConfig}
     */
    getConfig(): MatDialogConfig {

        const config = defaultConfig.clone();

        return config;
    }
}
