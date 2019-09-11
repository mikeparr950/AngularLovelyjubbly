import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfigService } from '../shared/utils/config.service';

@Component({
    templateUrl: '../portfolio/portfolio-screenshot.component.html',
})

export class PortfolioScreenshotComponent implements OnInit {

    private sub: Subscription;
    selectedId: number;
    screenshotUrl: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private _configService: ConfigService) {
    }

    ngOnInit(): void {

        this.sub = this._route.params.subscribe(
            params => {

                this.selectedId = +params['id'];

                switch (this.selectedId) {

                    case 1:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/1.png";
                        break;
                    case 2:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/2.png";
                        break;
                    case 3:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/3.png";
                        break;
                    case 4:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/4.png";
                        break;
                    case 5:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/5.png";
                        break;
                    case 6:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/6.png";
                        break;
                    case 7:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/7.png";
                        break;
                    case 8:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/8.png";
                        break;
                    case 9:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/9.png";
                        break;
                    case 10:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/10.png";
                        break;
                    case 11:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/11.png";
                        break;
                    case 12:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/12.png";
                        break;
                    case 13:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/13.png";
                        break;
                    case 14:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/14.png";
                        break;
                    case 15:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/15.png";
                        break;
                    case 16:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/felix/16.png";
                        break;
                    case 17:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/1.jpg";
                        break;
                    case 18:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/2.jpg";
                        break;
                    case 19:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/3.jpg";
                        break;
                    case 20:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/4.jpg";
                        break;
                    case 21:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/5.jpg";
                        break;
                    case 22:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/6.jpg";
                        break;
                    case 23:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/7.jpg";
                        break;
                    case 24:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/8.jpg";
                        break;
                    case 25:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/9.jpg";
                        break;
                    case 26:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/10.jpg";
                        break;
                    case 27:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/11.jpg";
                        break;
                    case 28:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/12.jpg";
                        break;
                    case 29:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/13.jpg";
                        break;
                    case 30:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/14.jpg";
                        break;
                    case 31:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/camco/15.jpg";
                        break;
                    case 32:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/1.png";
                        break;
                    case 33:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/2.png";
                        break;
                    case 34:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/3.png";
                        break;
                    case 35:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/4.png";
                        break;
                    case 36:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/5.png";
                        break;
                    case 37:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/6.png";
                        break;
                    case 38:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/7.png";
                        break;
                    case 39:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/8.png";
                        break;
                    case 40:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/9.png";
                        break;
                    case 41:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/10.png";
                        break;
                    case 42:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/11.png";
                        break;
                    case 43:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/12.png";
                        break;
                    case 44:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/13.png";
                        break;
                    case 45:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/gameplan/14.png";
                        break;
                    case 46:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/1.png";
                        break;
                    case 47:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/2.png";
                        break;
                    case 48:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/3.png";
                        break;
                    case 49:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/4.png";
                        break;
                    case 50:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/5.png";
                        break;
                    case 51:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/6.png";
                        break;
                    case 52:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/7.png";
                        break;
                    case 53:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/8.png";
                        break;
                    case 54:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/9.png";
                        break;
                    case 55:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/10.png";
                        break;
                    case 56:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/11.png";
                        break;
                    case 57:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/12.png";
                        break;
                    case 58:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/13.png";
                        break;
                    case 59:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/ihmeveikko/14.png";
                        break;
                    case 60:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/1.png";
                        break;
                    case 61:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/2.png";
                        break;
                    case 62:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/3.png";
                        break;
                    case 63:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/4.png";
                        break;
                    case 64:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/5.png";
                        break;
                    case 65:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/6.png";
                        break;
                    case 66:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/7.png";
                        break;
                    case 67:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/8.png";
                        break;
                    case 68:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/9.png";
                        break;
                    case 69:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/10.png";
                        break;
                    case 70:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/11.png";
                        break;
                    case 71:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/serla/12.png";
                        break;
                    case 72:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/1.jpg";
                        break;
                    case 73:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/2.jpg";
                        break;
                    case 74:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/3.jpg";
                        break;
                    case 75:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/4.jpg";
                        break;
                    case 76:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/5.jpg";
                        break;
                    case 77:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/6.jpg";
                        break;
                    case 78:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/7.jpg";
                        break;
                    case 79:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/8.jpg";
                        break;
                    case 80:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/blueorchid/9.jpg";
                        break;
                    case 81:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/1.jpg";
                        break;
                    case 82:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/2.jpg";
                        break;
                    case 83:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/3.jpg";
                        break;
                    case 84:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/4.jpg";
                        break;
                    case 85:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/5.jpg";
                        break;
                    case 86:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/6.jpg";
                        break;
                    case 87:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/7.jpg";
                        break;
                    case 88:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/8.jpg";
                        break;
                    case 89:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/9.jpg";
                        break;
                    case 90:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/10.jpg";
                        break;
                    case 91:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/11.jpg";
                        break;
                    case 92:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/12.jpg";
                        break;
                    case 93:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/13.jpg";
                        break;
                    case 94:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/14.jpg";
                        break;
                    case 95:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/15.jpg";
                        break;
                    case 96:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/16.jpg";
                        break;
                    case 97:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/17.jpg";
                        break;
                    case 98:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/dv2admin/18.jpg";
                        break;
                    case 99:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/1.png";
                        break;
                    case 100:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/2.png";
                        break;
                    case 101:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/3.png";
                        break;
                    case 102:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/4.png";
                        break;
                    case 103:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/5.png";
                        break;
                    case 104:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/6.png";
                        break;
                    case 105:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/7.png";
                        break;
                    case 106:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/8.png";
                        break;
                    case 107:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/9.png";
                        break;
                    case 108:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/10.png";
                        break;
                    case 109:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/11.png";
                        break;
                    case 110:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/12.png";
                        break;
                    case 111:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/13.png";
                        break;
                    case 112:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/14.png";
                        break;
                    case 113:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/15.png";
                        break;
                    case 114:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/16.png";
                        break;
                    case 115:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/17.png";
                        break;
                    case 116:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/xerox/18.png";
                        break;
                    case 117:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/1.png";
                        break;
                    case 118:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/2.png";
                        break;
                    case 119:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/3.png";
                        break;
                    case 120:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/4.png";
                        break;
                    case 121:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/5.png";
                        break;
                    case 122:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/6.png";
                        break;
                    case 123:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/7.png";
                        break;
                    case 124:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/8.png";
                        break;
                    case 125:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/9.png";
                        break;
                    case 126:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/10.png";
                        break;
                    case 127:
                        this.screenshotUrl =
                            this._configService.getServer() + "/assets/images/portfolio/chat2/11.png";
                        break;
                }
            });
    }
}
