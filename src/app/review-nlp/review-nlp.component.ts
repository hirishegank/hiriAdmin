import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ReviewServiceService } from "../reviewService.service";
import { Review } from "../Review";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: "app-review-nlp",
  templateUrl: "./review-nlp.component.html",
  styleUrls: ["./review-nlp.component.css"],
})
  

export class ReviewNlpComponent implements OnInit {
  chefid;
  chef;
  sub;
  Img;
  ReviewForm: FormGroup;
  reviews = [];
  constructor(
    private _Activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private afs: AngularFirestore,
    private _nlp: ReviewServiceService
  ) {}

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.chefid = params.get("chefid");
      this.afs
        .collection("chef")
        .doc(this.chefid)
        .snapshotChanges()
        .subscribe((res) => {
          this.chef = res.payload.data();

          this.chef.reviews.forEach(a => {
            let item: any = a;
            this.afs.collection('user').doc(a.user_id).get().subscribe(p => {
              let name = p;
              item.id = name.data().name;
            });
            this.reviews.push(item);
            let userStorageRef = firebase.storage().ref().child(this.chef.img);
    userStorageRef.getDownloadURL().then(url => {
      this.Img = url;
      console.log(this.Img);
    });

          });
          console.log(this.chef);
        });
    });

    this.ReviewForm = this.fb.group({
      admin_review: ["", [Validators.required]],
      admin_rating: ["", [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this._router.navigate(["review"]);
  }

  nlp(review) {
    this._nlp.getReviewStatus(review).subscribe((response: Review) => {
      console.log(response);
    });
  }

  update() {
    if (this.ReviewForm.valid) {
      this.afs.collection("chef").doc(this.chefid).update({
        admin_review: this.ReviewForm.value.admin_review,
        admin_rating: this.ReviewForm.value.admin_rating,
      });
    }
  }

  Decline(a) {
    console.log(a);
    a.status = 'decline';
    let removed = [];
    var f = 0;
    this.reviews.forEach(b => {
      if (f != 1) {
        let item: any = b;
        item.status = 'done';
        removed.push(item);
        f = f + 1;
      }
    });
    this.afs.collection("chef").doc(this.chefid).update({
      "reviews": removed
    });
  }
}
//isDeclined
