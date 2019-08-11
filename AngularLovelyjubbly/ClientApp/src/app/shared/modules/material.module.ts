import { NgModule } from '@angular/core';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatCardModule, MatTooltipModule, MatTabsModule} from '@angular/material';

import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../utils/common.service';

@NgModule({
    imports: [
        //BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTooltipModule,
        MatTabsModule
    ],
    exports: [
        //BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTooltipModule,
        MatTabsModule
    ]
})

export class MaterialModule {

    private isLocalStorageAvailable = false;

    constructor(private commonService: CommonService, private cookieService: CookieService) {

        //this.isLocalStorageAvailable = false;
        this.isLocalStorageAvailable = commonService.isLocalStorageAvailable();

        if (this.isLocalStorageAvailable) {
            const selectedLang = localStorage.getItem('selectedLang');

            //set locale for date adapter
            //switch (selectedLang) {
            //    case 'fi':
            //        this.adapter.setLocale('fi-FI');
            //        break;
            //    default:
            //        this.adapter.setLocale('en-GB');
            //        break;
            //}
        }
        else {
            //use cookies
            const selectedLang = this.cookieService.get('selectedLang');

            //set locale for date adapter
            //switch (selectedLang) {
            //    case 'fi':
            //        this.adapter.setLocale('fi-FI');
            //        break;
            //    default:
            //        this.adapter.setLocale('en-GB');
            //        break;
            //}
        }
    }
}
