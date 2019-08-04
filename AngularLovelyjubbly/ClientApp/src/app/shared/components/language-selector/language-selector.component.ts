import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import { CommonService } from '../../utils/common.service';
import { CookieService } from 'ngx-cookie-service';

L10n.load({
    'fi-FI': {
        'grid': {
            'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
            'GroupDropArea': 'Ziehen Sie einen Spaltenkopf hier, um die Gruppe ihre Spalte',
            'UnGroup': 'Klicken Sie hier, um die Gruppierung aufheben',
            'EmptyDataSourceError': 'DataSource darf bei der Erstauslastung nicht leer sein, da Spalten aus der dataSource im AutoGenerate Spaltenraster',
            'Item': 'Artikkeli',
            'Items': 'Artikkelia',
            'Add': 'Lisää',
            'Pdfexport': 'Vie PDF-tiedostoon',
            'Excelexport': 'Vie Exceliin',
            'FilterbarTitle': ' suodatin'
        },
        'pager': {
            'currentPageInfo': '{0}/{1} sivua',
            'totalItemsInfo': '({0} artikkelia)',
            'firstPageTooltip': 'Ensimmäiselle sivulle',
            'lastPageTooltip': 'Viimeiselle sivulle',
            'nextPageTooltip': 'Seuraavalle sivulle',
            'previousPageTooltip': 'Takaisin viimeiselle sivulle',
            'nextPagerTooltip': 'Zum nächsten Pager',
            'previousPagerTooltip': 'Zum vorherigen Pager'
        }
    }
});

@Component({
    selector: 'app-language-selector',
    templateUrl: 'language-selector.component.html'
})

export class LanguageSelectorComponent {

    /**properties */
    private isLocalStorageAvailable = false;
    private langOnLoad = 'en';
    @Output() languageChanged = new EventEmitter<string>();

    constructor(public translate: TranslateService, private commonService: CommonService, private cookieService: CookieService) {
        /** this.isLocalStorageAvailable = false; */
        this.isLocalStorageAvailable = commonService.isLocalStorageAvailable();
    }

    ngOnInit(): void {
        if (this.isLocalStorageAvailable) {
            this.langOnLoad = localStorage.getItem('selectedLang');
        } else {
            /** use cookies */
            this.langOnLoad = this.cookieService.get('selectedLang');
        }

    /**set locale for syncfusion */
        
        switch (this.langOnLoad) {
            case 'en':
                setCulture('en-GB');
                break;
            case 'fi':
                setCulture('fi-FI');
                break;
        }
    }

    /** events */
    /** list of events https://developer.mozilla.org/en-US/docs/Web/Events */
    languageSelectorClicked(lang: string): void {

        if (this.isLocalStorageAvailable) {
            localStorage.setItem('selectedLang', lang);
        } else {
            /** use cookies */
            this.cookieService.set('selectedLang', lang);
        }

        /**set locale for syncfusion */
        switch (lang) {
            case 'en':
                setCulture('en-US');
                break;
            case 'fi':
                setCulture('fi-FI');
                break;
        }

        this.translate.use(lang);

        /** emit change in language for output */
        this.languageChanged.emit(lang);

        
        

        //set locale for date adapter
        //switch (lang) {
        //    case 'en':
        //        this.adapter.setLocale('en-GB');
        //        break;
        //    case 'fi':
        //        this.adapter.setLocale('fi-FI');
        //        break;
        //}


        
    }
}
