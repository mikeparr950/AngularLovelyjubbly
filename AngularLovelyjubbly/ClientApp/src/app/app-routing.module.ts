import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameplanLayoutComponent } from '././shared/components/gameplan-layout/gameplan-layout.component';

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
        path: 'Portfolio',
        loadChildren: './portfolio/portfolio.module#PortfolioModule'
    },
    {
        path: '',
        component: GameplanLayoutComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }
