import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/modules/shared.module';
import { MaterialModule } from './shared/modules/material.module';
import { TeamModule } from './teams/team.module';
import { FixtureModule } from './fixtures/fixture.module';
import { QBRatingModule } from './qbratings/qbrating.module';
import { TurnoverDifferentialModule } from './turnoverdifferentials/turnoverdifferential.module';
import { PowerRankingModule } from './powerrankings/powerranking.module';
import { RecordModule } from './records/record.module';
import { SuperbowlOddModule } from './superbowlodds/superbowlodd.module';
import { MainModule } from './main/main.module';
import { PlayoffHistoryModule } from './playoffhistory/playoffhistory.module';
import { YardageModule } from './yardage/yardage.module';
import { AccountModule } from './account/account.module';

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
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    ChartsModule,
    SharedModule,
    MaterialModule,
    TeamModule,
    FixtureModule,
    QBRatingModule,
    TurnoverDifferentialModule,
    PowerRankingModule,
    RecordModule,
    SuperbowlOddModule,
    MainModule,
    PlayoffHistoryModule,
    YardageModule,
    AccountModule
  ],
  providers: [ConfigService, CommonService, LogService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
