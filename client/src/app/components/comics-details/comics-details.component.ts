import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import { ComicsDetailsResponseModel } from '../../models/comics.details.response.model';
import { AuthorModel } from '../../models/author.model';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss']
})

export class ComicsDetailsComponent implements OnInit {

  public comicsDetails: ComicsDetailsResponseModel;
  public author: AuthorModel;

  constructor(private comicsService: ComicsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.comicsService.getDifferentTitle(params['id']).subscribe(value => {
        this.comicsDetails = value;
        this.comicsService.getDifferentAuthors(value.data.authorId).subscribe(value => {
          this.author = value
        })
      })
    })
  }

}
