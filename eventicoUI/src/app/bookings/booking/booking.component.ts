import { Component, OnInit } from '@angular/core';
import { Event } from '../../events/shared/event.model';
import { Booking } from '../shared/booking.model';
import { BookingService } from '../shared/booking.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../events/shared/event.service';
import { BookingLayout } from '../../shared/booking-layout.model';
import { MatSnackBar } from '@angular/material';
import { SeoService } from '../../shared-services/seo.service';
import {MatDialog} from '@angular/material';
import { BookingConfirmationComponent } from '../../popups/booking-confirmation/booking-confirmation.component';
import { UserService } from '../../event-user/shared/user.service';
import { PaymentForm } from '../shared/paymentform.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  mode : string;
  booking : Booking;
  event : Event;
  bookingLayout : BookingLayout;
  payment_request_form : PaymentForm;

  constructor
  (
      private bookingService : BookingService,
      private eventService : EventService,
      private router : Router,
      private route : ActivatedRoute,
      public snackBar: MatSnackBar,
      private seo: SeoService,
      public dialog: MatDialog,
      private userservice : UserService,
  )
  {
    this.initPaymentForm();
    this.updateMetaData();
    this.route.params.subscribe(params => this.setupBooking(params['event_id'], params['id']));
  }

  initPaymentForm()
  {
    this.payment_request_form = new PaymentForm();
    this.payment_request_form.action = '';
    this.payment_request_form.key = '';
    this.payment_request_form.hash = '';
    this.payment_request_form.txnid = '';
    this.payment_request_form.amount = '';
    this.payment_request_form.firstname = '';
    this.payment_request_form.email = '';
    this.payment_request_form.phone = '';
    this.payment_request_form.product_info = '';
    this.payment_request_form.surl = '';
    this.payment_request_form.furl = '';
  }

  ngOnInit() {
  }

  setupBooking(event_id, booking_id)
  {
    if(booking_id)
    {
      this.mode = 'edit';
    }
    else
    {
      this.mode = 'new';
      this.setupNewBooking(event_id);
    }
  }

  setupNewBooking(event_id)
  {
    this.booking = new Booking(this.mode, )
    this.bookingLayout = this.booking.bookingLayout;
    this.event = this.booking.event;
    if(event_id != null && event_id != "undefined")
    {
      this.eventService.getEvent(event_id)
      .subscribe( (data) => {
        this.booking.import(data);
        //this.updateMetaData();
      }
      );
    }
  }

  skipAndBook()
  {
    this.bookingService.skipAndBook(this.booking)
    .subscribe( (data) => {

    }
    );

  }

  get layout_groups(){
    return this.bookingLayout.groups;
  }

  updateMetaData()
  {
    var config = {
      title : 'Geethanjali',//this.event.Name,
      desc : 'desc',//this.event.Desc,
      image_url : 'https://algovent-s3-static.s3.amazonaws.com/eventico/media/Code_data_P0UNmn7.jpg'//this.event.images['banner'].url,
    }
    this.seo.generateTags(config);
  }

  onNavigate()
  {
      const dialogRef = this.dialog.open(BookingConfirmationComponent, {
        width: '80%',
        data: {bookingLayout: this.bookingLayout}
      });

      dialogRef.afterClosed().subscribe(result => {
          if(result == 'book')
          {
            this.bookingService.book(this.booking, this.userservice.user)
            .subscribe(
              (data) => {
                var info = data['data'];
                this.processBookingSuccess(info);
              },
              (fdata) => {
                console.log(fdata);
              }
            );
          }
          else if(result == 'skipAndBook')
          {
            this.booking.skip_payment = true;
            this.bookingService.book(this.booking, this.userservice.user)
            .subscribe(
              (data) => {
                var info = data['data'];
                this.processSkipPayBookingSuccess(info);
              },
              (fdata) => {
                console.log(fdata);
              }
            );
          }
        }
      );
  }

  processBookingSuccess(data)
  {
      var message = 'Booking Confirmed';
      var action = '';
      let booking_confirm_bar = this.snackBar.open(message, action, {
        duration: 500,
        verticalPosition : 'top',
        horizontalPosition: 'right',
      });
      booking_confirm_bar.afterDismissed().subscribe(() => {
        this.redirect_to_payment(data);
      });
  }

  processSkipPayBookingSuccess(data)
  {
      var message = 'Booking Confirmed';
      var action = '';
      let booking_confirm_bar = this.snackBar.open(message, action, {
        duration: 500,
        verticalPosition : 'top',
        horizontalPosition: 'right',
      });
      booking_confirm_bar.afterDismissed().subscribe(() => {
        this.router.navigate(['']);
      });
  }

  redirect_to_payment(data)
  {
     var pfi = data['payment_gateway_info'];
     this.payment_request_form.action = pfi['action'];
     this.payment_request_form.key = pfi['key'];
     this.payment_request_form.hash = pfi['hash'];
     this.payment_request_form.txnid = pfi['txnid'];
     this.payment_request_form.amount = pfi['amount'];
     this.payment_request_form.firstname = pfi['firstname'];
     this.payment_request_form.email = pfi['email'];
     this.payment_request_form.phone = pfi['phone'];
     this.payment_request_form.product_info = pfi['productinfo'];
     this.payment_request_form.surl = pfi['surl'];
     this.payment_request_form.furl = pfi['furl'];
     var payment_form = <HTMLFormElement>document.getElementById('payment_form');
     setTimeout(() =>{
        var payment_form = <HTMLFormElement>document.getElementById('payment_form');
        setTimeout(() => {
          var payment_form = <HTMLFormElement>document.getElementById('payment_form');
          console.log(payment_form);

          payment_form.submit();
        });
     });
  }

  submit_onvalid(form_validity)
  {
    console.log(form_validity);
    return true;
  }

  get permissions() {
    return this.userservice.user.Permissions;
  }


}
