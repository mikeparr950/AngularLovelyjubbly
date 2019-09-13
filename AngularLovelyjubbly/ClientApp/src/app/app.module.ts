import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/modules/shared.module';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [ConfigService, CommonService, LogService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
