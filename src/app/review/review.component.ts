import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  chefs = [];
  ngOnInit() {
    this.afs.collection('chef').snapshotChanges().subscribe(res => {
      this.chefs = [];
      res.forEach(a => {
        let item: any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.chefs.push(item);
      });

    });


  
  }

}
