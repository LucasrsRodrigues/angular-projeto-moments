import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environments';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/interfaces/Moments';
import { MomentService } from 'src/app/service/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allMoments: Array<Moment> = [];
  moments: Array<Moment> = [];
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {

      const data = items.data;

      data.forEach((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-BR')
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => moment.title.toLocaleLowerCase().includes(value));
  }
}
