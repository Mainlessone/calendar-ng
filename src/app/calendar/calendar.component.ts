import { Component, OnInit } from '@angular/core';
import { IUser } from './models/user.interface';
import * as axios from 'axios';
import * as moment from 'moment';
import { IMonth } from './models/month.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  url: string = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';

  months: IMonth[] = [
    { name: 'January', users: [] },
    { name: 'February', users: [] },
    { name: 'March', users: [] },
    { name: 'April', users: [] },
    { name: 'May', users: [] },
    { name: 'June', users: [] },
    { name: 'July', users: [] },
    { name: 'August', users: [] },
    { name: 'September', users: [] },
    { name: 'October', users: [] },
    { name: 'November', users: [] },
    { name: 'December', users: [] }
  ];

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const users = (await axios.default.get(this.url)).data;
    this.months.forEach((month: IMonth) => {
      month.users = users.filter((user: IUser) => {
        const usersDob = moment(user.dob).format('MMMM');
        return usersDob == month.name
      })
    })
  }

}
