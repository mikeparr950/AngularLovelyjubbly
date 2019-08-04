import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; /** used for ngFor and ngIf, these are imported by BrowserModule in root */
import { RouterModule } from '@angular/router'; /** used for NavMenuComponent */
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { ShareButtonModule } from '@ngx-share/button';
import { CommonService } from '../utils/common.service';
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GridModule, EditService, ToolbarService, SortService, GroupService, PageService, FilterService, PdfExportService,
    ExcelExportService, ResizeService, RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';
import { CookieService } from 'ngx-cookie-service';

import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { SocialMediaButtonsComponent } from '../components/social-media-buttons/social-media-buttons.component';
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';
import { ScoreTickerComponent } from '../components/score-ticker/score-ticker.component';

import { NumberValidators } from '../validators/number.validator';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        BsDropdownModule.forRoot(),
        ShareButtonModule,
        GridModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],

    declarations: [
        NavMenuComponent,
        SocialMediaButtonsComponent,
        LanguageSelectorComponent,
        ScoreTickerComponent
    ],

    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        GridModule,
        NavMenuComponent,
        SocialMediaButtonsComponent,
        LanguageSelectorComponent,
        ScoreTickerComponent,
        TranslatePipe
    ],
    providers: [
        EditService,
        ToolbarService,
        SortService,
        PageService, 
        FilterService,
        PdfExportService,
        ExcelExportService,
        GroupService,
        ResizeService,
        RowDDService,
        SelectionService
    ]
    
})

export class SharedModule {

    private isLocalStorageAvailable = false;

    constructor(public translate: TranslateService, private commonService: CommonService, private cookieService: CookieService) {

        //this.isLocalStorageAvailable = false;
        this.isLocalStorageAvailable = commonService.isLocalStorageAvailable();

        if (this.isLocalStorageAvailable) {
            const selectedLang = localStorage.getItem('selectedLang');

            if (selectedLang === null) {

                /** globals set in shared module constructor */
                translate.addLangs(['en', 'fi']);
                translate.setDefaultLang('en');

                const browserLang = translate.getBrowserLang();
                translate.use(browserLang.match(/en|fi/) ? browserLang : 'en');

                localStorage.setItem('selectedLang', 'en');
            } else {
                translate.use(selectedLang);
            }
        }
        else {
            //use cookies
            const selectedLang = this.cookieService.get('selectedLang');

            if (typeof selectedLang === "undefined") {

                /** globals set in shared module constructor */
                translate.addLangs(['en', 'fi']);
                translate.setDefaultLang('en');

                const browserLang = translate.getBrowserLang();
                translate.use(browserLang.match(/en|fi/) ? browserLang : 'en');

                this.cookieService.set('selectedLang', 'en');
            } else {
                translate.use(selectedLang);
            }
        }
    }
}
