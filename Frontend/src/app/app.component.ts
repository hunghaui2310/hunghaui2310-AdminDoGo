import {Component, DoCheck, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.toastr.info('Một đơn hàng mới vừa được đặt', 'Thông báo', {
      positionClass: 'toast-bottom-left'
    });
  }
}
