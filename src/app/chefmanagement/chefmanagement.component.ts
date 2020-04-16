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
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

  opendel(content) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
