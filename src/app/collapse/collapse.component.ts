import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
 
  BarChart = [];
  
  popular_chefs = [];
  popular_foods = [];
  orders_of_chefs = [];
  orders_of_foods = [];
  
  constructor(private afs: AngularFirestore){}
  

  ngOnInit() {

    this.afs.collection('chef',res => res.limit(6))
    .snapshotChanges().subscribe(serverItems => {
      this.popular_chefs = [];
      this.orders_of_chefs = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        let id: any = a.payload.doc.id;
        
        this.afs.collection('orders', ref => ref.where('chef_id', '==', id)).valueChanges().subscribe(val => {
          let temp = val.length + 100;
          this.orders_of_chefs.push(temp);
        });
        this.popular_chefs.push(item.name);
      });
      console.log(this.popular_chefs);
      console.log(this.orders_of_chefs);


      
    // Bar chart:
    this.BarChart = new Chart('barChartFood', {
      type: 'bar',
      data: {
        labels: this.popular_chefs,
        datasets: [{
          label: '# orders',
          data: this.orders_of_chefs,
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
    });






    this.afs.collection('food',res => res.limit(6))
    .snapshotChanges().subscribe(serverItems => {
      this.popular_chefs = [];
      this.orders_of_chefs = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        let id: any = a.payload.doc.id;
        
        this.afs.collection('orders', ref => ref.where('food_id', '==', id)).valueChanges().subscribe(val => {
          let temp = val.length + 100;
          this.orders_of_foods.push(temp);
        });
        this.popular_foods.push(item.food_name);
      });
    

       //chef
    this.BarChart = new Chart('barChartChef', {
      type: 'bar',
      data: {
        labels: this.popular_foods,
        datasets: [{
          label: '# orders',
          data: this.orders_of_foods,
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
      

    });
    





   


  }
}
