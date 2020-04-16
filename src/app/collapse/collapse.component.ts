import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;
  public isCollapsed5 = true;
  BarChart=[];
  
  

  ngOnInit() {
    // Bar chart:
    this.BarChart = new Chart('barChartFood', {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# orders',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: 'rgb(34, 181, 115)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Most Popular Food",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });




    //chef
    this.BarChart = new Chart('barChartChef', {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# orders',
          data: [9, 7, 3, 5, 2, 10],
          backgroundColor: 'rgb(34, 181, 115)',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Most Popular chef",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


  }
}
