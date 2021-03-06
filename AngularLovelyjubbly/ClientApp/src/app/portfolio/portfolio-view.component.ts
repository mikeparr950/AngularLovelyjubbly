﻿import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../shared/utils/config.service';

@Component({
    templateUrl: '../portfolio/portfolio-view.component.html',
})

export class PortfolioViewComponent implements OnInit {

    felixLink1: string;
    felixLink2: string;
    felixLink3: string;
    felixLink4: string;
    felixLink5: string;
    felixLink6: string;
    felixLink7: string;
    felixLink8: string;
    felixLink9: string;
    felixLink10: string;
    felixLink11: string;
    felixLink12: string;
    felixLink13: string;
    felixLink14: string;
    felixLink15: string;
    felixLink16: string;
    camcoLink1: string;
    camcoLink2: string;
    camcoLink3: string;
    camcoLink4: string;
    camcoLink5: string;
    camcoLink6: string;
    camcoLink7: string;
    camcoLink8: string;
    camcoLink9: string;
    camcoLink10: string;
    camcoLink11: string;
    camcoLink12: string;
    camcoLink13: string;
    camcoLink14: string;
    camcoLink15: string;
    gameplanLink1: string;
    gameplanLink2: string;
    gameplanLink3: string;
    gameplanLink4: string;
    gameplanLink5: string;
    gameplanLink6: string;
    gameplanLink7: string;
    gameplanLink8: string;
    gameplanLink9: string;
    gameplanLink10: string;
    gameplanLink11: string;
    gameplanLink12: string;
    gameplanLink13: string;
    gameplanLink14: string;
    ihmeveikkoLink1: string;
    ihmeveikkoLink2: string;
    ihmeveikkoLink3: string;
    ihmeveikkoLink4: string;
    ihmeveikkoLink5: string;
    ihmeveikkoLink6: string;
    ihmeveikkoLink7: string;
    ihmeveikkoLink8: string;
    ihmeveikkoLink9: string;
    ihmeveikkoLink10: string;
    ihmeveikkoLink11: string;
    ihmeveikkoLink12: string;
    ihmeveikkoLink13: string;
    ihmeveikkoLink14: string;
    serlaLink1: string;
    serlaLink2: string;
    serlaLink3: string;
    serlaLink4: string;
    serlaLink5: string;
    serlaLink6: string;
    serlaLink7: string;
    serlaLink8: string;
    serlaLink9: string;
    serlaLink10: string;
    serlaLink11: string;
    serlaLink12: string;
    blueOrchidLink1: string;
    blueOrchidLink2: string;
    blueOrchidLink3: string;
    blueOrchidLink4: string;
    blueOrchidLink5: string;
    blueOrchidLink6: string;
    blueOrchidLink7: string;
    blueOrchidLink8: string;
    blueOrchidLink9: string;
    dv2Link1: string;
    dv2Link2: string;
    dv2Link3: string;
    dv2Link4: string;
    dv2Link5: string;
    dv2Link6: string;
    dv2Link7: string;
    dv2Link8: string;
    dv2Link9: string;
    dv2Link10: string;
    dv2Link11: string;
    dv2Link12: string;
    dv2Link13: string;
    dv2Link14: string;
    dv2Link15: string;
    dv2Link16: string;
    dv2Link17: string;
    dv2Link18: string;
    xeroxLink1: string;
    xeroxLink2: string;
    xeroxLink3: string;
    xeroxLink4: string;
    xeroxLink5: string;
    xeroxLink6: string;
    xeroxLink7: string;
    xeroxLink8: string;
    xeroxLink9: string;
    xeroxLink10: string;
    xeroxLink11: string;
    xeroxLink12: string;
    xeroxLink13: string;
    xeroxLink14: string;
    xeroxLink15: string;
    xeroxLink16: string;
    xeroxLink17: string;
    xeroxLink18: string;
    chat2Link1: string;
    chat2Link2: string;
    chat2Link3: string;
    chat2Link4: string;
    chat2Link5: string;
    chat2Link6: string;
    chat2Link7: string;
    chat2Link8: string;
    chat2Link9: string;
    chat2Link10: string;
    chat2Link11: string;

    constructor(private _configService: ConfigService) {

    }

    ngOnInit(): void {

        this.felixLink1 = this._configService.getServer() + "/Portfolio/Screenshot/1";
        this.felixLink2 = this._configService.getServer() + "/Portfolio/Screenshot/2";
        this.felixLink3 = this._configService.getServer() + "/Portfolio/Screenshot/3";
        this.felixLink4 = this._configService.getServer() + "/Portfolio/Screenshot/4";
        this.felixLink5 = this._configService.getServer() + "/Portfolio/Screenshot/5";
        this.felixLink6 = this._configService.getServer() + "/Portfolio/Screenshot/6";
        this.felixLink7 = this._configService.getServer() + "/Portfolio/Screenshot/7";
        this.felixLink8 = this._configService.getServer() + "/Portfolio/Screenshot/8";
        this.felixLink9 = this._configService.getServer() + "/Portfolio/Screenshot/9";
        this.felixLink10 = this._configService.getServer() + "/Portfolio/Screenshot/10";
        this.felixLink11 = this._configService.getServer() + "/Portfolio/Screenshot/11";
        this.felixLink12 = this._configService.getServer() + "/Portfolio/Screenshot/12";
        this.felixLink13 = this._configService.getServer() + "/Portfolio/Screenshot/13";
        this.felixLink14 = this._configService.getServer() + "/Portfolio/Screenshot/14";
        this.felixLink15 = this._configService.getServer() + "/Portfolio/Screenshot/15";
        this.felixLink16 = this._configService.getServer() + "/Portfolio/Screenshot/16";

        this.camcoLink1 = this._configService.getServer() + "/Portfolio/Screenshot/17";
        this.camcoLink2 = this._configService.getServer() + "/Portfolio/Screenshot/18";
        this.camcoLink3 = this._configService.getServer() + "/Portfolio/Screenshot/19";
        this.camcoLink4 = this._configService.getServer() + "/Portfolio/Screenshot/20";
        this.camcoLink5 = this._configService.getServer() + "/Portfolio/Screenshot/21";
        this.camcoLink6 = this._configService.getServer() + "/Portfolio/Screenshot/22";
        this.camcoLink7 = this._configService.getServer() + "/Portfolio/Screenshot/23";
        this.camcoLink8 = this._configService.getServer() + "/Portfolio/Screenshot/24";
        this.camcoLink9 = this._configService.getServer() + "/Portfolio/Screenshot/25";
        this.camcoLink10 = this._configService.getServer() + "/Portfolio/Screenshot/26";
        this.camcoLink11 = this._configService.getServer() + "/Portfolio/Screenshot/27";
        this.camcoLink12 = this._configService.getServer() + "/Portfolio/Screenshot/28";
        this.camcoLink13 = this._configService.getServer() + "/Portfolio/Screenshot/29";
        this.camcoLink14 = this._configService.getServer() + "/Portfolio/Screenshot/30";
        this.camcoLink15 = this._configService.getServer() + "/Portfolio/Screenshot/31";

        this.gameplanLink1 = this._configService.getServer() + "/Portfolio/Screenshot/32";
        this.gameplanLink2 = this._configService.getServer() + "/Portfolio/Screenshot/33";
        this.gameplanLink3 = this._configService.getServer() + "/Portfolio/Screenshot/34";
        this.gameplanLink4 = this._configService.getServer() + "/Portfolio/Screenshot/35";
        this.gameplanLink5 = this._configService.getServer() + "/Portfolio/Screenshot/36";
        this.gameplanLink6 = this._configService.getServer() + "/Portfolio/Screenshot/37";
        this.gameplanLink7 = this._configService.getServer() + "/Portfolio/Screenshot/38";
        this.gameplanLink8 = this._configService.getServer() + "/Portfolio/Screenshot/39";
        this.gameplanLink9 = this._configService.getServer() + "/Portfolio/Screenshot/40";
        this.gameplanLink10 = this._configService.getServer() + "/Portfolio/Screenshot/41";
        this.gameplanLink11 = this._configService.getServer() + "/Portfolio/Screenshot/42";
        this.gameplanLink12 = this._configService.getServer() + "/Portfolio/Screenshot/43";
        this.gameplanLink13 = this._configService.getServer() + "/Portfolio/Screenshot/44";
        this.gameplanLink14 = this._configService.getServer() + "/Portfolio/Screenshot/45";

        this.ihmeveikkoLink1 = this._configService.getServer() + "/Portfolio/Screenshot/46";
        this.ihmeveikkoLink2 = this._configService.getServer() + "/Portfolio/Screenshot/47";
        this.ihmeveikkoLink3 = this._configService.getServer() + "/Portfolio/Screenshot/48";
        this.ihmeveikkoLink4 = this._configService.getServer() + "/Portfolio/Screenshot/49";
        this.ihmeveikkoLink5 = this._configService.getServer() + "/Portfolio/Screenshot/50";
        this.ihmeveikkoLink6 = this._configService.getServer() + "/Portfolio/Screenshot/51";
        this.ihmeveikkoLink7 = this._configService.getServer() + "/Portfolio/Screenshot/52";
        this.ihmeveikkoLink8 = this._configService.getServer() + "/Portfolio/Screenshot/53";
        this.ihmeveikkoLink9 = this._configService.getServer() + "/Portfolio/Screenshot/54";
        this.ihmeveikkoLink10 = this._configService.getServer() + "/Portfolio/Screenshot/55";
        this.ihmeveikkoLink11 = this._configService.getServer() + "/Portfolio/Screenshot/56";
        this.ihmeveikkoLink12 = this._configService.getServer() + "/Portfolio/Screenshot/57";
        this.ihmeveikkoLink13 = this._configService.getServer() + "/Portfolio/Screenshot/58";
        this.ihmeveikkoLink14 = this._configService.getServer() + "/Portfolio/Screenshot/59";

        this.serlaLink1 = this._configService.getServer() + "/Portfolio/Screenshot/60";
        this.serlaLink2 = this._configService.getServer() + "/Portfolio/Screenshot/61";
        this.serlaLink3 = this._configService.getServer() + "/Portfolio/Screenshot/62";
        this.serlaLink4 = this._configService.getServer() + "/Portfolio/Screenshot/63";
        this.serlaLink5 = this._configService.getServer() + "/Portfolio/Screenshot/64";
        this.serlaLink6 = this._configService.getServer() + "/Portfolio/Screenshot/65";
        this.serlaLink7 = this._configService.getServer() + "/Portfolio/Screenshot/66";
        this.serlaLink8 = this._configService.getServer() + "/Portfolio/Screenshot/67";
        this.serlaLink9 = this._configService.getServer() + "/Portfolio/Screenshot/68";
        this.serlaLink10 = this._configService.getServer() + "/Portfolio/Screenshot/69";
        this.serlaLink11 = this._configService.getServer() + "/Portfolio/Screenshot/70";
        this.serlaLink12 = this._configService.getServer() + "/Portfolio/Screenshot/71";

        this.blueOrchidLink1 = this._configService.getServer() + "/Portfolio/Screenshot/72";
        this.blueOrchidLink2 = this._configService.getServer() + "/Portfolio/Screenshot/73";
        this.blueOrchidLink3 = this._configService.getServer() + "/Portfolio/Screenshot/74";
        this.blueOrchidLink4 = this._configService.getServer() + "/Portfolio/Screenshot/75";
        this.blueOrchidLink5 = this._configService.getServer() + "/Portfolio/Screenshot/76";
        this.blueOrchidLink6 = this._configService.getServer() + "/Portfolio/Screenshot/77";
        this.blueOrchidLink7 = this._configService.getServer() + "/Portfolio/Screenshot/78";
        this.blueOrchidLink8 = this._configService.getServer() + "/Portfolio/Screenshot/79";
        this.blueOrchidLink9 = this._configService.getServer() + "/Portfolio/Screenshot/80";

        this.dv2Link1 = this._configService.getServer() + "/Portfolio/Screenshot/81";
        this.dv2Link2 = this._configService.getServer() + "/Portfolio/Screenshot/82";
        this.dv2Link3 = this._configService.getServer() + "/Portfolio/Screenshot/83";
        this.dv2Link4 = this._configService.getServer() + "/Portfolio/Screenshot/84";
        this.dv2Link5 = this._configService.getServer() + "/Portfolio/Screenshot/85";
        this.dv2Link6 = this._configService.getServer() + "/Portfolio/Screenshot/86";
        this.dv2Link7 = this._configService.getServer() + "/Portfolio/Screenshot/87";
        this.dv2Link8 = this._configService.getServer() + "/Portfolio/Screenshot/88";
        this.dv2Link9 = this._configService.getServer() + "/Portfolio/Screenshot/89";
        this.dv2Link10 = this._configService.getServer() + "/Portfolio/Screenshot/90";
        this.dv2Link11 = this._configService.getServer() + "/Portfolio/Screenshot/91";
        this.dv2Link12 = this._configService.getServer() + "/Portfolio/Screenshot/92";
        this.dv2Link13 = this._configService.getServer() + "/Portfolio/Screenshot/93";
        this.dv2Link14 = this._configService.getServer() + "/Portfolio/Screenshot/94";
        this.dv2Link15 = this._configService.getServer() + "/Portfolio/Screenshot/95";
        this.dv2Link16 = this._configService.getServer() + "/Portfolio/Screenshot/96";
        this.dv2Link17 = this._configService.getServer() + "/Portfolio/Screenshot/97";
        this.dv2Link18 = this._configService.getServer() + "/Portfolio/Screenshot/98";

        this.xeroxLink1 = this._configService.getServer() + "/Portfolio/Screenshot/99";
        this.xeroxLink2 = this._configService.getServer() + "/Portfolio/Screenshot/100";
        this.xeroxLink3 = this._configService.getServer() + "/Portfolio/Screenshot/101";
        this.xeroxLink4 = this._configService.getServer() + "/Portfolio/Screenshot/102";
        this.xeroxLink5 = this._configService.getServer() + "/Portfolio/Screenshot/103";
        this.xeroxLink6 = this._configService.getServer() + "/Portfolio/Screenshot/104";
        this.xeroxLink7 = this._configService.getServer() + "/Portfolio/Screenshot/105";
        this.xeroxLink8 = this._configService.getServer() + "/Portfolio/Screenshot/106";
        this.xeroxLink9 = this._configService.getServer() + "/Portfolio/Screenshot/107";
        this.xeroxLink10 = this._configService.getServer() + "/Portfolio/Screenshot/108";
        this.xeroxLink11 = this._configService.getServer() + "/Portfolio/Screenshot/109";
        this.xeroxLink12 = this._configService.getServer() + "/Portfolio/Screenshot/110";
        this.xeroxLink13 = this._configService.getServer() + "/Portfolio/Screenshot/111";
        this.xeroxLink14 = this._configService.getServer() + "/Portfolio/Screenshot/112";
        this.xeroxLink15 = this._configService.getServer() + "/Portfolio/Screenshot/113";
        this.xeroxLink16 = this._configService.getServer() + "/Portfolio/Screenshot/114";
        this.xeroxLink17 = this._configService.getServer() + "/Portfolio/Screenshot/115";
        this.xeroxLink18 = this._configService.getServer() + "/Portfolio/Screenshot/116";

        this.chat2Link1 = this._configService.getServer() + "/Portfolio/Screenshot/117";
        this.chat2Link2 = this._configService.getServer() + "/Portfolio/Screenshot/118";
        this.chat2Link3 = this._configService.getServer() + "/Portfolio/Screenshot/119";
        this.chat2Link4 = this._configService.getServer() + "/Portfolio/Screenshot/120";
        this.chat2Link5 = this._configService.getServer() + "/Portfolio/Screenshot/121";
        this.chat2Link6 = this._configService.getServer() + "/Portfolio/Screenshot/122";
        this.chat2Link7 = this._configService.getServer() + "/Portfolio/Screenshot/123";
        this.chat2Link8 = this._configService.getServer() + "/Portfolio/Screenshot/124";
        this.chat2Link9 = this._configService.getServer() + "/Portfolio/Screenshot/125";
        this.chat2Link10 = this._configService.getServer() + "/Portfolio/Screenshot/126";
        this.chat2Link11 = this._configService.getServer() + "/Portfolio/Screenshot/127";
    }
}
