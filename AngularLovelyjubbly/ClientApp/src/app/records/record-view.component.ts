import { Component, OnInit } from '@angular/core';

import { IRecord, Record } from '../shared/models/record';
import { RecordService } from '../shared/services/record.service';

@Component({
    templateUrl: '../records/record-view.component.html',
})

export class RecordViewComponent implements OnInit {

    public pieChartType = 'pie';
    public barChartType = 'bar';
    public doughnutChartType = 'doughnut';
    public horizontalBarChartType = 'horizontalBar';

    //pie
    public pieChartLabels: string[] = ['Rams', 'Colts', 'Chargers', '49ers', 'Broncos', 'Packers', 'Bears', 'Oilers', 'Browns', 
        'Texans', 'Dolphins', 'Chiefs', 'Giants'];
    public pieChartData: number[] = [3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1];
    private pieChartOptions = {
        title: {
            text: 'Superbowl Wins By Team',
            display: true
        },
        legend: {
            display: false,
            position: 'top'
        },
        showTooltips: true
    };
    private pieChartColors = [
        {
            backgroundColor: [
                'rgba(4, 30, 66, 1)',
                'rgba(0, 59, 123, 1)',
                'rgba(255, 184, 28, 1)',
                'rgba(230, 190, 138, 1)',
                'rgba(251, 79, 20, 1)',
                'rgba(36, 66, 60, 1)',
                'rgba(0, 0, 51, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(81, 47, 45, 1)',
                'rgba(0, 0, 102, 1)',
                'rgba(0, 141, 151, 1)',
                'rgba(178, 0, 50, 1)',
                'rgba(25, 47, 107, 1)'
            ]
        }
    ];

    //doughnut
    public doughnutChartLabels: string[] = ['Williams', 'Gorner', 'Parr', 'Flesfader', 'Thorpe', 'Cross', 'Goetz', 'Dawson', 
        'Whittingham', 'Richards', 'Stones', 'Hennes', 'Thorp-Potter', 'Smith', 'Risson', 'Edwards'];
    public doughnutChartData: number[] = [3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    private doughnutChartOptions = {
        title: {
            text: 'Superbowl Wins By Coach',
            display: true
        },
        legend: {
            display: false,
            position: 'top'
        },
        showTooltips: true
    };

    //bar
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        title: {
            text: 'Most Superbowl Appearances By Team',
            display: true
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 7 } }]
        },
        showTooltips: true
    };
    private barChartColors = [
        {
            backgroundColor: [
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(224, 224, 224, 1)'
            ]
        }
    ];
    public barChartLabels: string[] = ['Rams', 'Packers', 'Texans', 'Dolphins', 'Colts', 'Oilers', 'Bears', 'Chargers', 'Redskins',
        '49ers', 'Browns', 'Broncos', 'Chiefs'];
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [7, 5, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2] }
    ];

    //horizontal bar
    public horizontalBarChartOptions: any = {
        scaleShowHorizontallLines: false,
        title: {
            text: 'Most Superbowl Appearances By Coach',
            display: true
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{ id: 'x-axis-1', type: 'linear', position: 'bottom', ticks: { min: 0, max: 7 } }]
        },
        showTooltips: true
    };
    private horizontalBarChartColors = [
        {
            backgroundColor: [
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)',
                'rgba(65, 143, 222, 1)'
            ]
        }
    ];
    public horizontalBarChartLabels: string[] = ['Williams', 'Parr', 'Flesfader', 'Gorner', 'Dawson', 'Stones', 'Smith'];
    public horizontalBarChartData: any[] = [
        {
            data: [7, 6, 6, 2, 2, 2, 2]
        }
    ];

    records: IRecord[];
    firstRecord: IRecord[];
    secondRecord: IRecord[];
    thirdRecord: IRecord[];
    fourthRecord: IRecord[];
    fifthRecord: IRecord[];
    sixthRecord: IRecord[];
    seventhRecord: IRecord[];
    eigthRecord: IRecord[];
    ninthRecord: IRecord[];
    tenthRecord: IRecord[];
    eleventhRecord: IRecord[];
    twelfthRecord: IRecord[];
    thirteenthRecord: IRecord[];
    fourteenthRecord: IRecord[];
    fifteenthRecord: IRecord[];
    sixteenthRecord: IRecord[];
    seventeenthRecord: IRecord[];
    eighteenthRecord: IRecord[];
    ninteenthRecord: IRecord[];
    twentiethRecord: IRecord[];
    twentyfirstRecord: IRecord[];
    twentysecondRecord: IRecord[];
    twentythirdRecord: IRecord[];
    twentyfourthRecord: IRecord[];
    twentyfifthRecord: IRecord[];
    twentysixthRecord: IRecord[];
    twentyseventhRecord: IRecord[];
    twentyeigthRecord: IRecord[];
    twentyninthRecord: IRecord[];
    thirtiethRecord: IRecord[];
    firstSetSelected: boolean;
    secondSetSelected: boolean;
    thirdSetSelected: boolean;
    fourthSetSelected: boolean;
    fifthSetSelected: boolean;
    sixthSetSelected: boolean;
    seventhSetSelected: boolean;
    eigthSetSelected: boolean;
    ninthSetSelected: boolean;
    tenthSetSelected: boolean;
    errorMessage: string;

    constructor(public _recordService: RecordService) {
    }

    buttonClicked(event: any) {
        if (event == 1) {
            this.firstSetSelected = true;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 2) {
            this.firstSetSelected = false;
            this.secondSetSelected = true;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 3) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = true;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 4) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = true;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 5) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = true;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 6) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = true;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 7) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = true;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 8) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = true;
            this.ninthSetSelected = false;
            this.tenthSetSelected = false;
        }
        if (event == 9) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = true;
            this.tenthSetSelected = false;
        }
        if (event == 10) {
            this.firstSetSelected = false;
            this.secondSetSelected = false;
            this.thirdSetSelected = false;
            this.fourthSetSelected = false;
            this.fifthSetSelected = false;
            this.sixthSetSelected = false;
            this.seventhSetSelected = false;
            this.eigthSetSelected = false;
            this.ninthSetSelected = false;
            this.tenthSetSelected = true;
        }
    }

    ngOnInit(): void {

        this._recordService.getRecords()
            .subscribe(records => {
                this.records = new Array<Record>();

                this.firstRecord = records.slice(0, 3);
                this.secondRecord = records.slice(3, 6);
                this.thirdRecord = records.slice(6, 9);
                this.fourthRecord = records.slice(9, 12);
                this.fifthRecord = records.slice(12, 15);
                this.sixthRecord = records.slice(15, 18);
                this.seventhRecord = records.slice(18, 21);
                this.eigthRecord = records.slice(21, 24);
                this.ninthRecord = records.slice(24, 27);
                this.tenthRecord = records.slice(27, 30);
                this.eleventhRecord = records.slice(30, 33);
                this.twelfthRecord = records.slice(33, 36);
                this.thirteenthRecord = records.slice(36, 39);
                this.fourteenthRecord = records.slice(39, 42);
                this.fifteenthRecord = records.slice(42, 45);
                this.sixteenthRecord = records.slice(45, 48);
                this.seventeenthRecord = records.slice(48, 51);
                this.eighteenthRecord = records.slice(51, 54);
                this.ninteenthRecord = records.slice(54, 57);
                this.twentiethRecord = records.slice(57, 60);
                this.twentyfirstRecord = records.slice(60, 63);
                this.twentysecondRecord = records.slice(63, 66);
                this.twentythirdRecord = records.slice(66, 69);
                this.twentyfourthRecord = records.slice(69, 72);
                this.twentyfifthRecord = records.slice(72, 75);
                this.twentysixthRecord = records.slice(75, 78);
                this.twentyseventhRecord = records.slice(78, 81);
                this.twentyeigthRecord = records.slice(81, 84);
                this.twentyninthRecord = records.slice(84, 87);
                this.thirtiethRecord = records.slice(87, 90);

                this.firstSetSelected = true;
            },
                error => this.errorMessage = <any>error);
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
