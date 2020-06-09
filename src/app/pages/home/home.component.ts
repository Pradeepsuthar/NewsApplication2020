import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostModule } from 'src/app/modules/post/post.module';
import { PostDataService } from "src/app/services/post-data.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: PostModule[];
  constructor(
    private firestore: AngularFirestore,
    public postService: PostDataService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.list = res;
    });
    this.postService.getMyAllPost().subscribe(res=>{
      console.log(res)
    })
  }

}
