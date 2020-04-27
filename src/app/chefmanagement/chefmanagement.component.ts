import { AngularFirestore } from '@angular/fire/firestore';
import { ManageChefServiceService } from './../manage-chef-service.service';
import { FormBuilder,FormControl, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-daialog.service';

@Component({
  selector: 'app-chefmanagement',
  templateUrl: './chefmanagement.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chefmanagement.component.css']
})
export class ChefmanagementComponent implements OnInit {

  chefs = [];
  b;
  closeResult: string;
  chefForm: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder,private manageChef:ManageChefServiceService,private afs: AngularFirestore,private confirmationDialogService: ConfirmationDialogService) { }
  ngOnInit() {
    this.afs.collection('chef').snapshotChanges().subscribe(res => {
      res.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.afs.collection('orders',re=>re.where('chef_id','==',item.id)).valueChanges().subscribe(a =>{
          this.b = a;
          item.orders = this.b.length + 50;
        });
        
        this.chefs.push(item);
      });
    });

    this.chefForm = this.fb.group({
      fname:  ['', 
        Validators.required
      ],
      lname:  ['', 
        Validators.required,
      ],
      location:  ['', 
        Validators.required,
      ],
      NICNumber:  ['',
        Validators.required,
      ],
      PhoneNumber:  ['',
        Validators.required,
      ],
    });


  }

  public openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this chef... ?')
    .then((confirmed) => this.delete(id))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  delete(item) {
    this.afs.collection('chef').doc(item).delete();
  }

  get fname() {
    return this.chefForm.get('fname');
  }

  get lname() {
    return this.chefForm.get('lname');
  }

  get location() {
    return this.chefForm.get('fname');
  }

  get NICNumber() {
    return this.chefForm.get('NICNumber');
  }

  get PhoneNumber() {
    return this.chefForm.get('PhoneNumber');
  }


  onSubmit(){
    let data = this.chefForm.value;
    if (this.chefForm.valid) {
      this.chefForm.reset();
      this.manageChef.InsertChef(data).then(res => {
        console.log('Chef inserted successfully!');
      });
    }
  }


  open(content) {
    this.modalService.open(content,{size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  chef;

  opendel(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
