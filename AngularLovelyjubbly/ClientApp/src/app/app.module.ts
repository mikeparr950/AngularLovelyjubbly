import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/modules/shared.module';
import { MaterialModule } from './shared/modules/material.module';
//import { QBRatingModule } from './qbratings/qbrating.module';
//import { TurnoverDifferentialModule } from './turnoverdifferentials/turnoverdifferential.module';
//import { PowerRankingModule } from './powerrankings/powerranking.module';
//import { MainModule } from './main/main.module';
//import { PlayoffHistoryModule } from './playoffhistory/playoffhistory.module';
//import { YardageModule } from './yardage/yardage.module';

import { ConfigService } from './shared/utils/config.service';
import { CommonService } from './shared/utils/common.service';
import { LogService } from './shared/utils/log.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    //HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
    SharedModule,
    MaterialModule
  ],
  providers: [ConfigService, CommonService, LogService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
