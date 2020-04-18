import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-nlp',
  templateUrl: './review-nlp.component.html',
  styleUrls: ['./review-nlp.component.css']
})
export class ReviewNlpComponent implements OnInit {

  chefid;
  chef;
  sub;
  ReviewForm : FormGroup;
  constructor(private _Activatedroute: ActivatedRoute,private fb: FormBuilder,private _router: Router,private afs:AngularFirestore) { }

  ngOnInit() {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.chefid = params.get('chefid');
      this.afs.collection('chef').doc(this.chefid).snapshotChanges().subscribe(res => {
        this.chef = res.payload.data();
        console.log(this.chef);
        });

    });



    
  this.ReviewForm = this.fb.group({
    admin_review: ['', [Validators.required]],
    admin_rating: ['', [Validators.required]],
  });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  onBack(): void {
     this._router.navigate(['review']);
  }

  update() {
    if (this.ReviewForm.valid) {
      this.afs.collection('chef').doc(this.chefid).update({
        admin_review: this.ReviewForm.value.admin_review,
        admin_rating: this.ReviewForm.value.admin_rating,
      });
    }
  }


  Decline(a) {
    this.afs.collection('chef').doc(this.chefid).collection('reviews', res => res.where('user_id', '==', a.user_id)).add({
      isDeclined: true
    });
  }
   
}
//isDeclined