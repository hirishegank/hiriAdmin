import { ManageChefServiceService } from './../manage-chef-service.service';
import { FormBuilder,FormControl, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chefmanagement',
  templateUrl: './chefmanagement.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./chefmanagement.component.css']
})
export class ChefmanagementComponent implements OnInit {

  closeResult: string;
  chefForm: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder,private manageChef:ManageChefServiceService) { }
  ngOnInit() {
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
    this.getChef();

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

  cheflist;

  getChef = () => {
    this.manageChef
      .getchef()
      .subscribe(res => (this.cheflist = res));
  }

  deleteChef = data => this.manageChef.deletechef(data);



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
