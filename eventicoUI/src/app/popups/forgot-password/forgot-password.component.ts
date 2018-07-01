import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService } from '../../event-user/shared/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  email = '';
  password = '';
  otp = '';
  verification_token = '';
  emailFormGroup: FormGroup;
  otpFormGroup: FormGroup;
  resetPasswordFormGroup: FormGroup;

  success = false;
  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userservice : UserService, private _formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    }

  ngOnInit() {
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required]
    });
    this.otpFormGroup = this._formBuilder.group({
      otpCtrl: ['', Validators.required]
    });
    this.resetPasswordFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required]
    });
  }

  send_otp(email, stepper)
  {
    this.userservice.user.ProfileUpdationPending = true;
    this.email = email;
    this.userservice.sendForgotPasswordOTP(this.email)
    .subscribe(
      (sdata) => {
        this.afterRequest(sdata);
        stepper.next();
      },
      (fdata) => {
        this.afterRequestFailure(fdata['error']);
      },
    );
  }

  confirm_otp(otp, stepper)
  {
    this.userservice.user.ProfileUpdationPending = true;
    this.otp = otp;
    this.userservice.verify_otp(this.email, otp)
    .subscribe(
      (sdata) => {
        this.verification_token = sdata['data']['token'];
        this.afterRequest(sdata);
        stepper.next();

      },
      (fdata) => {
        this.afterRequestFailure(fdata['error']);
      },
    );
  }

  reset_password(password)
  {
    this.userservice.user.ProfileUpdationPending = true;
    this.userservice.reset_password(this.verification_token, password)
    .subscribe(
      (sdata) => {
        this.afterRequest(sdata);
        this.dialogRef.close();
      },
      (fdata) => {
        this.afterRequestFailure(fdata['error']);
        this.dialogRef.close();
      },
    );
  }

  show_snackbar(message)
  {
    var action = 'OK';
    let snack_bar = this.snackBar.open(message, action, {
      verticalPosition : 'top',
      horizontalPosition: 'right',
    });
  }

  afterRequest(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }

  afterRequestFailure(data)
  {
    this.userservice.user.ProfileUpdationPending = false;
    if(data['messages'])
    {
      this.show_snackbar(data['messages'].join(','));
    }
  }
}
