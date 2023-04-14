import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicsService } from '../../services/comics.service';
import { TitlesResponse } from '../../models/title.response';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SortAndFindTitlesArrayModel } from '../../models/array.status.type.model';
import { MessageService } from 'primeng/api'
import { HttpParams } from '@angular/common/http';
import { GenreResponseModel } from '../../models/genre.response.model';
import { titlesSortDirectionArray } from '../../arrays/titles.sort.direction.array';
import { arrayAllTitleTypes } from '../../arrays/all.title.types.array';
import { arrayAllTitleStatuses } from '../../arrays/all.title.statuses.array'
import { allSortTypesArray } from '../../arrays/all.sort.types.array'

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})

export class ComicsListComponent implements OnInit {

  public form: FormGroup;
  public genres: Observable<GenreResponseModel>;
  public titles: Observable<TitlesResponse>;
  public sortDirection = titlesSortDirectionArray;
  public sortTypes = allSortTypesArray;
  public type: SortAndFindTitlesArrayModel[] = arrayAllTitleTypes;
  public titleStatuses: SortAndFindTitlesArrayModel[] = arrayAllTitleStatuses;
  public maxYear: number = new Date().getFullYear();

  public hasFormBeenChanged: boolean = false;

  constructor(
      private comicsService: ComicsService,
      private router: Router,
      private formBuilder: FormBuilder,
      private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      genre: [null],
      direction: [null],
      sortType: [null],
      types: [null],
      statuses: [null],
      min: [null, [
        Validators.min(1900),
        Validators.minLength(4),
        Validators.max(this.maxYear)
      ]
      ],
      max: [null, [
        Validators.min(1900),
        Validators.minLength(4),
        Validators.max(this.maxYear)
        ]
      ]
    })
      this.genres = this.comicsService.getAllGenres();
      this.titles = this.comicsService.getAllTitles();
      this.form.valueChanges.subscribe(() => {
        this.hasFormBeenChanged = true;
      })
  }

  public filterComics(): void {
    const { types, sortType, statuses, direction, genre, min, max } = this.form.controls;
    let params: HttpParams = new HttpParams();

    if (genre.value) {
      for (const value of genre.value) {
        params = params.append('genres[include][]', value);
      }
    }

    if (direction.value) {
      params = params.append('sortOrder', direction.value);
    }

    if (sortType.value) {
      params = params.append('sortBy', sortType.value.name);
    }

    if (types.value && types.value.length) {
      for (const type of types.value) {
        params = params.append('types[]', type.name);
      }
    }

    if (statuses.value && statuses.value.length) {
      for (const status of statuses.value) {
        params = params.append('status[]', status.name);
      }
    }

    this.validateFormYears();

    if (this.form.valid && min.value) {
      params = params.append('yearRelease[min]', min.value);
    }

    if (this.form.valid && max.value) {
      params = params.append('yearRelease[max]', max.value);
    }

    this.titles = this.comicsService.getAllTitles(params);
  }

  public validateFormYears(): void {
    const { min, max } = this.form.controls;

    if (min.value) {
      if (min.hasError('min')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: 'Мінімальний рік - 1900' });
      }
      if (min.hasError('minLength')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: 'Рік повинен містити не менше 4 цифри' });
      }
      if (min.hasError('max')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: `Рік не може бути більший чим ${this.maxYear} поточний` });
      }
    }

    if (max.value) {
      if (max.hasError('min')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: 'Мінімальний рік - 1900' });
      }
      if (max.hasError('minLength')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: 'Рік повинен містити не менше 4 цифри' });
      }
      if (max.hasError('max')) {
        this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: `Рік не може бути більший чим ${this.maxYear} поточний` });
      }
    }
  }

  public goToDetails(id: number): void {
    this.router.navigate([`titles/${id}`]);
  }

  public reset() {
    this.form.reset();
    this.titles = this.comicsService.getAllTitles();
    this.hasFormBeenChanged = false;
  }

  public getId(id: number) {
    console.log(
      id);
  }


}
