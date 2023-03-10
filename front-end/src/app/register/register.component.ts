import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of, tap } from 'rxjs';

import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private usersService: UsersService, private signupMessage: MatSnackBar, private router: Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  signupUser() {
    const { email, firstName, lastName, password } = this.signupForm.value;
    this.usersService.signupUser(email!, firstName!, lastName!, password!)
      .pipe(catchError(err => {
        this.signupMessage.open(`Error: ${err.error.message}`, '', {
          duration: 5000,
          panelClass: ['login-message-fail'],
        });
        return of();
      }),
        tap((response) => {
          this.router.navigate(['/setup'])
            .then(() => {
              window.location.reload();
            });
        })
      )
      .subscribe();
  }
}
