import { Component } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moments';
import { MessagesService } from 'src/app/service/messages.service';
import { MomentService } from 'src/app/service/moment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';

  constructor(private momentService: MomentService, private messagesService: MessagesService, private router: Router) { }


  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();

    this.messagesService.add("Momento adicionado com sucesso!");

    this.router.navigate(['/']);

  }
}
