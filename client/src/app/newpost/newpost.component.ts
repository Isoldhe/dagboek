import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../Post';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [PostService]
  })

export class NewpostComponent implements OnInit {


  constructor(public fb: FormBuilder, private postService: PostService) { }

  public newPost = this.fb.group({
    title: ['', Validators.required],
    smiley: ['', Validators.required],
    date: ['', Validators.required],
    entry: ['', Validators.required]
  });

  ngOnInit() {
  }

  public saveNewPost(event) {

    const title = this.newPost.controls['title'].value;
    const smiley = this.newPost.controls['smiley'].value;
    const date = this.newPost.controls['date'].value;
    const entry = this.newPost.controls['entry'].value;

    this.postService.saveNewPost(new Post(0, title, smiley, date, entry)).subscribe();


  }

}
