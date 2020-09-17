import { Component, OnInit } from '@angular/core';
import { Post } from '../../modals/post-modal';
import { PostDataService } from "src/app/services/post-data.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: Post[];
  categoryList = ['For you', 'Trending', 'News', 'Sports', 'Enterainment'];


  constructor(
    public postService: PostDataService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.list = res;
    });
  }

}
