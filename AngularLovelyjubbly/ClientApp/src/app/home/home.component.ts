import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { IStanding } from '../shared/models/standing';
import { FixtureService } from '../shared/services/fixture.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Default /** https://alligator.io/angular/change-detection-strategy/ */
})
export class HomeComponent implements OnInit {
    errorMessage: string;
    private sub: Subscription;
    public gridData: any;
    @ViewChild('gridAFCEast') public gridAFCEast: GridComponent;
    @ViewChild('gridAFCEastSmall') public gridAFCEastSmall: GridComponent;
    @ViewChild('gridAFCCentral') public gridAFCCentral: GridComponent;
    @ViewChild('gridAFCCentralSmall') public gridAFCCentralSmall: GridComponent;
    @ViewChild('gridAFCWest') public gridAFCWest: GridComponent;
    @ViewChild('gridAFCWestSmall') public gridAFCWestSmall: GridComponent;
    @ViewChild('gridNFCEast') public gridNFCEast: GridComponent;
    @ViewChild('gridNFCEastSmall') public gridNFCEastSmall: GridComponent;
    @ViewChild('gridNFCCentral') public gridNFCCentral: GridComponent;
    @ViewChild('gridNFCCentralSmall') public gridNFCCentralSmall: GridComponent;
    @ViewChild('gridNFCWest') public gridNFCWest: GridComponent;
    @ViewChild('gridNFCWestSmall') public gridNFCWestSmall: GridComponent;

    standingsAFCEast: IStanding[];
    standingsAFCCentral: IStanding[];
    standingsAFCWest: IStanding[];
    standingsNFCEast: IStanding[];
    standingsNFCCentral: IStanding[];
    standingsNFCWest: IStanding[];

    txtTeamEn: string;
    txtCoachEn: string;
    txtWinsEn: string;
    txtLossesEn: string;
    txtTiesEn: string;
    txtPointsForEn: string;
    txtPointsAgainstEn: string;
    txtPointsDifference: string;
    txtTeamFi: string;
    txtCoachFi: string;
    txtWinsFi: string;
    txtLossesFi: string;
    txtTiesFi: string;
    txtPointsForFi: string;
    txtPointsAgainstFi: string;


    constructor(public _fixtureService: FixtureService, public _userService: UserService, private cd: ChangeDetectorRef) {
        
        this.txtTeamEn = 'Team';
        this.txtCoachEn = 'Coach';
        this.txtWinsEn = 'W';
        this.txtLossesEn = 'L';
        this.txtTiesEn = 'T';
        this.txtPointsForEn = 'F';
        this.txtPointsAgainstEn = 'A';
        this.txtPointsDifference = '+/-';
        this.txtTeamFi = 'Joukkue';
        this.txtCoachFi = 'Valmentaja';
        this.txtWinsFi = 'V';
        this.txtLossesFi = 'H';
        this.txtTiesFi = 'T';
        this.txtPointsForFi = 'TP';
        this.txtPointsAgainstFi = 'PP';
    }

    ngOnInit() {
        this.refreshStandingList();

        //this._regularSeasonWinsService.getRegularSeasonWinsByTeamName('Houston Texans')
        //    .subscribe((regularSeasonWins) => this.regularSeasonWins = regularSeasonWins);
        //this._turnoverDifferentialService.getTurnoverDifferentialsBySeasonName('2026').subscribe((turnoverDifferentials) =>
        //    this.turnoverDifferentials = turnoverDifferentials);
        //this._refreshTokenService.getRefreshToken('e711ba42-6c2f-40d8-53a1-08d6701a9a17').subscribe((refreshToken) => this.refreshToken = refreshToken);
        //this._powerRankingService.getPowerRankingsByTournamentAndWeek(20,1).subscribe((powerRankings) =>
        //    this.powerRankings = powerRankings);

        //this.data = [
        //    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38, ShipCountry: 'France' },
        //    { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61, ShipCountry: ' Germany' },
        //    { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83, ShipCountry: 'Brazil' },
        //    { OrderID: 10251, CustomerID: 'VICTE', Freight: 41.34, ShipCountry: 'France' },
        //    { OrderID: 10252, CustomerID: 'SUPRD', Freight: 51.3, ShipCountry: 'Belgium' },
        //    { OrderID: 10253, CustomerID: 'HANAR', Freight: 58.17, ShipCountry: 'Brazil' },
        //    { OrderID: 10254, CustomerID: 'CHOPS', Freight: 22.98, ShipCountry: 'Switzerland' },
        //    { OrderID: 10255, CustomerID: 'RICSU', Freight: 148.33, ShipCountry: 'Switzerland' },
        //    { OrderID: 10256, CustomerID: 'SUPRD', Freight: 13.97, ShipCountry: 'Brazil' },
        //    { OrderID: 10257, CustomerID: 'WELLI', Freight: 14.23, ShipCountry: 'Venezuela' },
        //    { OrderID: 10258, CustomerID: 'VICTE', Freight: 18.33, ShipCountry: 'France' },
        //    { OrderID: 10259, CustomerID: 'WELLI', Freight: 28.13, ShipCountry: 'Brazil' },
        //    { OrderID: 10260, CustomerID: 'CHOPS', Freight: 48.34, ShipCountry: 'Switzerland' },
        //    { OrderID: 10261, CustomerID: 'SUPRD', Freight: 32.73, ShipCountry: ' Germany' },
        //    { OrderID: 10262, CustomerID: 'TOMSP', Freight: 12.31, ShipCountry: 'Switzerland' },
        //    { OrderID: 10263, CustomerID: 'VICTE', Freight: 23.77, ShipCountry: 'Brazil' },
        //    { OrderID: 10264, CustomerID: 'SUPRD', Freight: 43.47, ShipCountry: 'Venezuela' },
        //    { OrderID: 10265, CustomerID: 'CHOPS', Freight: 53.37, ShipCountry: 'Belgium' },
        //];
    }

    refreshStandingList() {
        //this.cd.reattach();
        this._fixtureService.getAFCEastStandingsByTournament(22)
            .subscribe(standingsAFCEast => this.standingsAFCEast = standingsAFCEast,
                error => this.errorMessage = <any>error);
        this._fixtureService.getAFCCentralStandingsByTournament(22)
            .subscribe(standingsAFCCentral => this.standingsAFCCentral = standingsAFCCentral,
                error => this.errorMessage = <any>error);
        this._fixtureService.getAFCWestStandingsByTournament(22)
            .subscribe(standingsAFCWest => this.standingsAFCWest = standingsAFCWest,
                error => this.errorMessage = <any>error);
        this._fixtureService.getNFCEastStandingsByTournament(22)
            .subscribe(standingsNFCEast => this.standingsNFCEast = standingsNFCEast,
                error => this.errorMessage = <any>error);
        this._fixtureService.getNFCCentralStandingsByTournament(22)
            .subscribe(standingsNFCCentral => this.standingsNFCCentral = standingsNFCCentral,
                error => this.errorMessage = <any>error);
        this._fixtureService.getNFCWestStandingsByTournament(22)
            .subscribe(standingsNFCWest => this.standingsNFCWest = standingsNFCWest,
                error => this.errorMessage = <any>error);
        //this.cd.detach();
    }

    refreshHeader() {
        var colTeamAFCEast = this.gridAFCEast.getColumnByField('team.teamName');
        var colCoachAFCEast = this.gridAFCEast.getColumnByField('team.coach.coachName');
        var colWinsAFCEast = this.gridAFCEast.getColumnByField('won');
        var colLossesAFCEast = this.gridAFCEast.getColumnByField('lost');
        var colTiedAFCEast = this.gridAFCEast.getColumnByField('tied');
        var colPointsForAFCEast = this.gridAFCEast.getColumnByField('pointsFor');
        var colPointsAgainstAFCEast = this.gridAFCEast.getColumnByField('pointsAgainst');
        var colPointsDifferenceAFCEast = this.gridAFCEast.getColumnByField('pointsDifference');

        var colTeamAFCEastShort = this.gridAFCEastSmall.getColumnByField('team.teamNameShort');
        var colCoachAFCEastShort = this.gridAFCEastSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsAFCEastShort = this.gridAFCEastSmall.getColumnByField('won');
        var colLossesAFCEastShort = this.gridAFCEastSmall.getColumnByField('lost');
        var colTiedAFCEastShort = this.gridAFCEastSmall.getColumnByField('tied');
        var colPointsDifferenceAFCEastShort = this.gridAFCEastSmall.getColumnByField('pointsDifference');

        var colTeamAFCCentral = this.gridAFCCentral.getColumnByField('team.teamName');
        var colCoachAFCCentral = this.gridAFCCentral.getColumnByField('team.coach.coachName');
        var colWinsAFCCentral = this.gridAFCCentral.getColumnByField('won');
        var colLossesAFCCentral = this.gridAFCCentral.getColumnByField('lost');
        var colTiedAFCCentral = this.gridAFCCentral.getColumnByField('tied');
        var colPointsForAFCCentral = this.gridAFCCentral.getColumnByField('pointsFor');
        var colPointsAgainstAFCCentral = this.gridAFCCentral.getColumnByField('pointsAgainst');
        var colPointsDifferenceAFCCentral = this.gridAFCCentral.getColumnByField('pointsDifference');

        var colTeamAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('team.teamNameShort');
        var colCoachAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('won');
        var colLossesAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('lost');
        var colTiedAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('tied');
        var colPointsDifferenceAFCCentralShort = this.gridAFCCentralSmall.getColumnByField('pointsDifference');

        var colTeamAFCWest = this.gridAFCWest.getColumnByField('team.teamName');
        var colCoachAFCWest = this.gridAFCWest.getColumnByField('team.coach.coachName');
        var colWinsAFCWest = this.gridAFCWest.getColumnByField('won');
        var colLossesAFCWest = this.gridAFCWest.getColumnByField('lost');
        var colTiedAFCWest = this.gridAFCWest.getColumnByField('tied');
        var colPointsForAFCWest = this.gridAFCWest.getColumnByField('pointsFor');
        var colPointsAgainstAFCWest = this.gridAFCWest.getColumnByField('pointsAgainst');
        var colPointsDifferenceAFCWest = this.gridAFCWest.getColumnByField('pointsDifference');

        var colTeamAFCWestShort = this.gridAFCWestSmall.getColumnByField('team.teamNameShort');
        var colCoachAFCWestShort = this.gridAFCWestSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsAFCWestShort = this.gridAFCWestSmall.getColumnByField('won');
        var colLossesAFCWestShort = this.gridAFCWestSmall.getColumnByField('lost');
        var colTiedAFCWestShort = this.gridAFCWestSmall.getColumnByField('tied');
        var colPointsDifferenceAFCWestShort = this.gridAFCWestSmall.getColumnByField('pointsDifference');

        var colTeamNFCEast = this.gridNFCEast.getColumnByField('team.teamName');
        var colCoachNFCEast = this.gridNFCEast.getColumnByField('team.coach.coachName');
        var colWinsNFCEast = this.gridNFCEast.getColumnByField('won');
        var colLossesNFCEast = this.gridNFCEast.getColumnByField('lost');
        var colTiedNFCEast = this.gridNFCEast.getColumnByField('tied');
        var colPointsForNFCEast = this.gridNFCEast.getColumnByField('pointsFor');
        var colPointsAgainstNFCEast = this.gridNFCEast.getColumnByField('pointsAgainst');
        var colPointsDifferenceNFCEast = this.gridNFCEast.getColumnByField('pointsDifference');

        var colTeamNFCEastShort = this.gridNFCEastSmall.getColumnByField('team.teamNameShort');
        var colCoachNFCEastShort = this.gridNFCEastSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsNFCEastShort = this.gridNFCEastSmall.getColumnByField('won');
        var colLossesNFCEastShort = this.gridNFCEastSmall.getColumnByField('lost');
        var colTiedNFCEastShort = this.gridNFCEastSmall.getColumnByField('tied');
        var colPointsDifferenceNFCEastShort = this.gridNFCEastSmall.getColumnByField('pointsDifference');

        var colTeamNFCCentral = this.gridNFCCentral.getColumnByField('team.teamName');
        var colCoachNFCCentral = this.gridNFCCentral.getColumnByField('team.coach.coachName');
        var colWinsNFCCentral = this.gridNFCCentral.getColumnByField('won');
        var colLossesNFCCentral = this.gridNFCCentral.getColumnByField('lost');
        var colTiedNFCCentral = this.gridNFCCentral.getColumnByField('tied');
        var colPointsForNFCCentral = this.gridNFCCentral.getColumnByField('pointsFor');
        var colPointsAgainstNFCCentral = this.gridNFCCentral.getColumnByField('pointsAgainst');
        var colPointsDifferenceNFCCentral = this.gridNFCCentral.getColumnByField('pointsDifference');

        var colTeamNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('team.teamNameShort');
        var colCoachNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('won');
        var colLossesNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('lost');
        var colTiedNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('tied');
        var colPointsDifferenceNFCCentralShort = this.gridNFCCentralSmall.getColumnByField('pointsDifference');

        var colTeamNFCWest = this.gridNFCWest.getColumnByField('team.teamName');
        var colCoachNFCWest = this.gridNFCWest.getColumnByField('team.coach.coachName');
        var colWinsNFCWest = this.gridNFCWest.getColumnByField('won');
        var colLossesNFCWest = this.gridNFCWest.getColumnByField('lost');
        var colTiedNFCWest = this.gridNFCWest.getColumnByField('tied');
        var colPointsForNFCWest = this.gridNFCWest.getColumnByField('pointsFor');
        var colPointsAgainstNFCWest = this.gridNFCWest.getColumnByField('pointsAgainst');
        var colPointsDifferenceNFCWest = this.gridNFCWest.getColumnByField('pointsDifference');

        var colTeamNFCWestShort = this.gridNFCWestSmall.getColumnByField('team.teamNameShort');
        var colCoachNFCWestShort = this.gridNFCWestSmall.getColumnByField('team.coach.coachNameShort');
        var colWinsNFCWestShort = this.gridNFCWestSmall.getColumnByField('won');
        var colLossesNFCWestShort = this.gridNFCWestSmall.getColumnByField('lost');
        var colTiedNFCWestShort = this.gridNFCWestSmall.getColumnByField('tied');
        var colPointsDifferenceNFCWestShort = this.gridNFCWestSmall.getColumnByField('pointsDifference');

        if (this._userService.currentLanguage() === 'en') {
            colTeamAFCEast.headerText = this.txtTeamEn;
            colCoachAFCEast.headerText = this.txtCoachEn;
            colWinsAFCEast.headerText = this.txtWinsEn;
            colLossesAFCEast.headerText = this.txtLossesEn;
            colTiedAFCEast.headerText = this.txtTiesEn;
            colPointsForAFCEast.headerText = this.txtPointsForEn;
            colPointsAgainstAFCEast.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceAFCEast.headerText = this.txtPointsDifference;
            colTeamAFCEastShort.headerText = this.txtTeamEn;
            colCoachAFCEastShort.headerText = this.txtCoachEn;
            colWinsAFCEastShort.headerText = this.txtWinsEn;
            colLossesAFCEastShort.headerText = this.txtLossesEn;
            colTiedAFCEastShort.headerText = this.txtTiesEn;
            colPointsDifferenceAFCEastShort.headerText = this.txtPointsDifference;

            colTeamAFCCentral.headerText = this.txtTeamEn;
            colCoachAFCCentral.headerText = this.txtCoachEn;
            colWinsAFCCentral.headerText = this.txtWinsEn;
            colLossesAFCCentral.headerText = this.txtLossesEn;
            colTiedAFCCentral.headerText = this.txtTiesEn;
            colPointsForAFCCentral.headerText = this.txtPointsForEn;
            colPointsAgainstAFCCentral.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceAFCCentral.headerText = this.txtPointsDifference;
            colTeamAFCCentralShort.headerText = this.txtTeamEn;
            colCoachAFCCentralShort.headerText = this.txtCoachEn;
            colWinsAFCCentralShort.headerText = this.txtWinsEn;
            colLossesAFCCentralShort.headerText = this.txtLossesEn;
            colTiedAFCCentralShort.headerText = this.txtTiesEn;
            colPointsDifferenceAFCCentralShort.headerText = this.txtPointsDifference;

            colTeamAFCWest.headerText = this.txtTeamEn;
            colCoachAFCWest.headerText = this.txtCoachEn;
            colWinsAFCWest.headerText = this.txtWinsEn;
            colLossesAFCWest.headerText = this.txtLossesEn;
            colTiedAFCWest.headerText = this.txtTiesEn;
            colPointsForAFCWest.headerText = this.txtPointsForEn;
            colPointsAgainstAFCWest.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceAFCWest.headerText = this.txtPointsDifference;
            colTeamAFCWestShort.headerText = this.txtTeamEn;
            colCoachAFCWestShort.headerText = this.txtCoachEn;
            colWinsAFCWestShort.headerText = this.txtWinsEn;
            colLossesAFCWestShort.headerText = this.txtLossesEn;
            colTiedAFCWestShort.headerText = this.txtTiesEn;
            colPointsDifferenceAFCWestShort.headerText = this.txtPointsDifference;

            colTeamNFCEast.headerText = this.txtTeamEn;
            colCoachNFCEast.headerText = this.txtCoachEn;
            colWinsNFCEast.headerText = this.txtWinsEn;
            colLossesNFCEast.headerText = this.txtLossesEn;
            colTiedNFCEast.headerText = this.txtTiesEn;
            colPointsForNFCEast.headerText = this.txtPointsForEn;
            colPointsAgainstNFCEast.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceNFCEast.headerText = this.txtPointsDifference;
            colTeamNFCEastShort.headerText = this.txtTeamEn;
            colCoachNFCEastShort.headerText = this.txtCoachEn;
            colWinsNFCEastShort.headerText = this.txtWinsEn;
            colLossesNFCEastShort.headerText = this.txtLossesEn;
            colTiedNFCEastShort.headerText = this.txtTiesEn;
            colPointsDifferenceNFCEastShort.headerText = this.txtPointsDifference;

            colTeamNFCCentral.headerText = this.txtTeamEn;
            colCoachNFCCentral.headerText = this.txtCoachEn;
            colWinsNFCCentral.headerText = this.txtWinsEn;
            colLossesNFCCentral.headerText = this.txtLossesEn;
            colTiedNFCCentral.headerText = this.txtTiesEn;
            colPointsForNFCCentral.headerText = this.txtPointsForEn;
            colPointsAgainstNFCCentral.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceNFCCentral.headerText = this.txtPointsDifference;
            colTeamNFCCentralShort.headerText = this.txtTeamEn;
            colCoachNFCCentralShort.headerText = this.txtCoachEn;
            colWinsNFCCentralShort.headerText = this.txtWinsEn;
            colLossesNFCCentralShort.headerText = this.txtLossesEn;
            colTiedNFCCentralShort.headerText = this.txtTiesEn;
            colPointsDifferenceNFCCentralShort.headerText = this.txtPointsDifference;

            colTeamNFCWest.headerText = this.txtTeamEn;
            colCoachNFCWest.headerText = this.txtCoachEn;
            colWinsNFCWest.headerText = this.txtWinsEn;
            colLossesNFCWest.headerText = this.txtLossesEn;
            colTiedNFCWest.headerText = this.txtTiesEn;
            colPointsForNFCWest.headerText = this.txtPointsForEn;
            colPointsAgainstNFCWest.headerText = this.txtPointsAgainstEn;
            colPointsDifferenceNFCWest.headerText = this.txtPointsDifference;
            colTeamNFCWestShort.headerText = this.txtTeamEn;
            colCoachNFCWestShort.headerText = this.txtCoachEn;
            colWinsNFCWestShort.headerText = this.txtWinsEn;
            colLossesNFCWestShort.headerText = this.txtLossesEn;
            colTiedNFCWestShort.headerText = this.txtTiesEn;
            colPointsDifferenceNFCWestShort.headerText = this.txtPointsDifference;
        }
        else if (this._userService.currentLanguage() === 'fi') {
            colTeamAFCEast.headerText = this.txtTeamFi;
            colCoachAFCEast.headerText = this.txtCoachFi;
            colWinsAFCEast.headerText = this.txtWinsFi;
            colLossesAFCEast.headerText = this.txtLossesFi;
            colTiedAFCEast.headerText = this.txtTiesFi;
            colPointsForAFCEast.headerText = this.txtPointsForFi;
            colPointsAgainstAFCEast.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceAFCEast.headerText = this.txtPointsDifference;
            colTeamAFCEastShort.headerText = this.txtTeamFi;
            colCoachAFCEastShort.headerText = this.txtCoachFi;
            colWinsAFCEastShort.headerText = this.txtWinsFi;
            colLossesAFCEastShort.headerText = this.txtLossesFi;
            colTiedAFCEastShort.headerText = this.txtTiesFi;
            colPointsDifferenceAFCEastShort.headerText = this.txtPointsDifference;

            colTeamAFCCentral.headerText = this.txtTeamFi;
            colCoachAFCCentral.headerText = this.txtCoachFi;
            colWinsAFCCentral.headerText = this.txtWinsFi;
            colLossesAFCCentral.headerText = this.txtLossesFi;
            colTiedAFCCentral.headerText = this.txtTiesFi;
            colPointsForAFCCentral.headerText = this.txtPointsForFi;
            colPointsAgainstAFCCentral.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceAFCCentral.headerText = this.txtPointsDifference;
            colTeamAFCCentralShort.headerText = this.txtTeamFi;
            colCoachAFCCentralShort.headerText = this.txtCoachFi;
            colWinsAFCCentralShort.headerText = this.txtWinsFi;
            colLossesAFCCentralShort.headerText = this.txtLossesFi;
            colTiedAFCCentralShort.headerText = this.txtTiesFi;
            colPointsDifferenceAFCCentralShort.headerText = this.txtPointsDifference;

            colTeamAFCWest.headerText = this.txtTeamFi;
            colCoachAFCWest.headerText = this.txtCoachFi;
            colWinsAFCWest.headerText = this.txtWinsFi;
            colLossesAFCWest.headerText = this.txtLossesFi;
            colTiedAFCWest.headerText = this.txtTiesFi;
            colPointsForAFCWest.headerText = this.txtPointsForFi;
            colPointsAgainstAFCWest.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceAFCWest.headerText = this.txtPointsDifference;
            colTeamAFCWestShort.headerText = this.txtTeamFi;
            colCoachAFCWestShort.headerText = this.txtCoachFi;
            colWinsAFCWestShort.headerText = this.txtWinsFi;
            colLossesAFCWestShort.headerText = this.txtLossesFi;
            colTiedAFCWestShort.headerText = this.txtTiesFi;
            colPointsDifferenceAFCWestShort.headerText = this.txtPointsDifference;

            colTeamNFCEast.headerText = this.txtTeamFi;
            colCoachNFCEast.headerText = this.txtCoachFi;
            colWinsNFCEast.headerText = this.txtWinsFi;
            colLossesNFCEast.headerText = this.txtLossesFi;
            colTiedNFCEast.headerText = this.txtTiesFi;
            colPointsForNFCEast.headerText = this.txtPointsForFi;
            colPointsAgainstNFCEast.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceNFCEast.headerText = this.txtPointsDifference;
            colTeamNFCEastShort.headerText = this.txtTeamFi;
            colCoachNFCEastShort.headerText = this.txtCoachFi;
            colWinsNFCEastShort.headerText = this.txtWinsFi;
            colLossesNFCEastShort.headerText = this.txtLossesFi;
            colTiedNFCEastShort.headerText = this.txtTiesFi;
            colPointsDifferenceNFCEastShort.headerText = this.txtPointsDifference;

            colTeamNFCCentral.headerText = this.txtTeamFi;
            colCoachNFCCentral.headerText = this.txtCoachFi;
            colWinsNFCCentral.headerText = this.txtWinsFi;
            colLossesNFCCentral.headerText = this.txtLossesFi;
            colTiedNFCCentral.headerText = this.txtTiesFi;
            colPointsForNFCCentral.headerText = this.txtPointsForFi;
            colPointsAgainstNFCCentral.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceNFCCentral.headerText = this.txtPointsDifference;
            colTeamNFCCentralShort.headerText = this.txtTeamFi;
            colCoachNFCCentralShort.headerText = this.txtCoachFi;
            colWinsNFCCentralShort.headerText = this.txtWinsFi;
            colLossesNFCCentralShort.headerText = this.txtLossesFi;
            colTiedNFCCentralShort.headerText = this.txtTiesFi;
            colPointsDifferenceNFCCentralShort.headerText = this.txtPointsDifference;

            colTeamNFCWest.headerText = this.txtTeamFi;
            colCoachNFCWest.headerText = this.txtCoachFi;
            colWinsNFCWest.headerText = this.txtWinsFi;
            colLossesNFCWest.headerText = this.txtLossesFi;
            colTiedNFCWest.headerText = this.txtTiesFi;
            colPointsForNFCWest.headerText = this.txtPointsForFi;
            colPointsAgainstNFCWest.headerText = this.txtPointsAgainstFi;
            colPointsDifferenceNFCWest.headerText = this.txtPointsDifference;
            colTeamNFCWestShort.headerText = this.txtTeamFi;
            colCoachNFCWestShort.headerText = this.txtCoachFi;
            colWinsNFCWestShort.headerText = this.txtWinsFi;
            colLossesNFCWestShort.headerText = this.txtLossesFi;
            colTiedNFCWestShort.headerText = this.txtTiesFi;
            colPointsDifferenceNFCWestShort.headerText = this.txtPointsDifference;
        }

        this.gridAFCEast.refreshHeader();
        this.gridAFCEastSmall.refreshHeader();
        this.gridAFCCentral.refreshHeader();
        this.gridAFCCentralSmall.refreshHeader();
        this.gridAFCWest.refreshHeader();
        this.gridAFCWestSmall.refreshHeader();
        this.gridNFCEast.refreshHeader();
        this.gridNFCEastSmall.refreshHeader();
        this.gridNFCCentral.refreshHeader();
        this.gridNFCCentralSmall.refreshHeader();
        this.gridNFCWest.refreshHeader();
        this.gridNFCWestSmall.refreshHeader();
    }

    changeLanguage() {
        console.log('language selector clicked');

        this.refreshHeader();
    }
}
