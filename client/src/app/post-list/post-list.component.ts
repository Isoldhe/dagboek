import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { User } from "../models/User";
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService]
})
export class PostListComponent implements OnInit {

  // All posts for currentUser
  allPosts: Post[];

  currentUser: User;

  smileyVeryHappy: any = '😄';
  smileySlightlyHappy: any = '🙂';
  smileyNeutral: any = '😐';
  smileyAngry: any = '😡';
  smileySad: any = '😢';

  // Boolean for DeleteAccountDialog
  deleteAccount: boolean = false;

  constructor(private postService: PostService,
              public dialog: MatDialog) {
    this.postService.eventCallback$.subscribe(data => {
      this.callbackFunction();
    });
  }

  ngOnInit() {
    this.postService.getAllPosts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  callbackFunction() {
    this.allPosts = this.postService.posts;

    // Sort post order based on date
    this.allPosts = this.allPosts.sort((a: any, b: any) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  delete(id) {
    this.postService.delete(id).subscribe(() => this.postService.getAllPosts());
  }

  getSmiley(storedSmiley) {
    let smiley: any = '';
    if (storedSmiley == "very happy") {
      smiley = this.smileyVeryHappy;
    }
    else if (storedSmiley == "slightly happy") {
      smiley = this.smileySlightlyHappy;
    }
    else if (storedSmiley == "neutral") {
      smiley = this.smileyNeutral;
    }
    else if (storedSmiley == "angry") {
      smiley = this.smileyAngry;
    }
    else if (storedSmiley == "sad") {
      smiley = this.smileySad;
    }
    return smiley;
  }

  // Open DeleteAccountDialog
  openDialog(): void {
    console.log("this.deleteAccount on open dialog = " + this.deleteAccount);
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      width: '250px',
      data: {deleteAccount: this.deleteAccount}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("Delete account? " + result); // undefined
      this.deleteAccount = result;
      console.log("this.deleteAccount on close = " + this.deleteAccount); // undefined
    });
  }


}
