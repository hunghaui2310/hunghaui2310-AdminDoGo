import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {OauthService} from '../../../services/oauth.service';
import {ApiService} from '../../../services/api.service';
import {HttpClient} from '@angular/common/http';
import {appConfig} from '../../../config/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginFail = false;
  submitted = false;
  isUserActive = false;
  isPassActive = false;
  loginForm: FormGroup;
  urlFacebook: string;

  constructor(private router: Router,
              private oauthService: OauthService,
              private fb: FormBuilder,
              private zone: NgZone,
              private apiService: ApiService,
              private toast: ToastrService,
              private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
// username: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  login(username: string, password: string) {
    this.oauthService.login(username, password).pipe(first())
      .subscribe(
        () => {
          this.success('Đăng nhập thành công');
          window.location.replace('');
          // this.zone.run( () => {});
        },
        error => {
// this.router.navigate(['/login']);
          this.isLoginFail = true;
        }
      );
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
// stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.zone.run( () => { this.login(this.loginForm.value.username, this.loginForm.value.password); } );
  }

  userActive() {
    this.isUserActive = true;
  }

  userBlur() {
    this.isUserActive = false;
  }

  passActive() {
    this.isPassActive = true;
  }

  passBlur() {
    this.isPassActive = false;
  }

  success(message: string) {
    this.toast.success(message, 'Thông báo');
  }

  error(message: string) {
    this.toast.error(message, 'Lỗi');
  }

  loginFacebook() {
    this.http.get(appConfig.facebook_login_api).subscribe(
      data => {
        this.urlFacebook = data['data'];
        console.log('url Facebook', this.urlFacebook);
        window.location.replace(this.urlFacebook);
        this.accessToken(this.urlFacebook);
      }
    );
  }

  accessToken(code: string) {
    this.apiService.accessTokenFbAPI(code).subscribe(
      data => {
        console.log('da goi vao day');
        this.apiService.getUserData(data['data']).subscribe(

        );
      }
    );
  }
}
