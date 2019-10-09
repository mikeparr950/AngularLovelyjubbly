import { NgModule } from '@angular/core';
import {
    GridModule, EditService, ToolbarService, SortService, GroupService, PageService, FilterService,
    ExcelExportService, ResizeService, RowDDService, SelectionService
} from '@syncfusion/ej2-angular-grids';

@NgModule({
    imports: [
        GridModule
    ],
    exports: [
        GridModule
    ],
    providers: [
        EditService,
        ToolbarService,
        SortService,
        PageService,
        FilterService,
        ExcelExportService,
        GroupService,
        ResizeService,
        RowDDService,
        SelectionService
    ]
})

export class SyncfusionModule {
}
