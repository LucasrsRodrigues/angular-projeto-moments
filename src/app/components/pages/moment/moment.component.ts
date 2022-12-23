import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/service/moment.service';
import { Moment } from 'src/app/interfaces/Moments';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environments';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/service/messages.service';
import { Comment } from 'src/app/interfaces/Comment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);


    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  removeHandler(id: number) {
    this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento excluido com sucesso!");

    this.router.navigate(['/'])
  }


  onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data));


    this.messagesService.add("Comentário adicionado!");


    // reseto o form
    this.commentForm.reset();

    formDirective.resetForm();
  }

}
