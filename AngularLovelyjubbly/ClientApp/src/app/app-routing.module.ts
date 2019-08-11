import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

/** lazy loading of modules */
const routes: Routes = [
    {
        path: 'Teams',
        loadChildren: './teams/team.module#TeamModule'
    },
    {
        path: 'Fixtures',
        loadChildren: './fixtures/fixture.module#FixtureModule'
    },
    {
        path: 'Accounts',
        loadChildren: './account/account.module#AccountModule'
    },
    {
        path: 'QBRatings',
        loadChildren: './qbratings/qbrating.module#QBRatingModule'
    },
    {
        path: 'TurnoverDifferentials',
        loadChildren: './turnoverdifferentials/turnoverdifferential.module#TurnoverDifferentialModule'
    },
    {
        path: 'PowerRankings',
        loadChildren: './powerrankings/powerranking.module#PowerRankingModule'
    },
    {
        path: 'Records',
        loadChildren: './records/record.module#RecordModule'
    },
    {
        path: 'SuperbowlOdds',
        loadChildren: './superbowlodds/superbowlodd.module#SuperbowlOddModule'
    },
    {
        path: 'Main',
        loadChildren: './main/main.module#MainModule'
    },
    {
        path: 'PlayoffHistory',
        loadChildren: './playoffhistory/playoffhistory.module#PlayoffHistoryModule'
    },
    {
        path: 'Yardages',
        loadChildren: './yardages/yardage.module#YardageModule'
    },
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
