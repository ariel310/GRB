import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  public doughnutChartType: string = 'doughnut';

  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('data') doughnutChartData: string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
