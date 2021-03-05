import { Component, OnInit, Input} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {      
    chart : {
      plotBorderWidth: null,
      plotShadow: false
   },
   title : {
      text: ''   
   },
   tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   plotOptions : {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
   
         dataLabels: {
            enabled: false           
         },
   
         showInLegend: true
      }
   },
   series : [{
      type: 'pie',
      name: 'Expenditure',
      data: [
         ['Rent',47.0],
         ['Grocery',20.0],
         {
            name: 'Savings',
            y: 13.0,
            sliced: true,
            selected: true
         },
         ['Electricity',2.0],
         ['Transport',5.0],
         ['Gym',8.0],
         ['Others',5.0]
      ]
   }]
  };

  

  @Input() data = [];
  constructor() { }
  


  ngOnInit(): void {
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
