import { Component, OnInit } from '@angular/core';
import { HackernewsService } from './service/hackernews.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private hackernewsService: HackernewsService) { }

  searchInput: string;
  qHackerNews = null

  authorSubmissions = [{
    "author": "",
    "submissions": 0
  }]

  ngOnInit(): void {
    this.getHackerNews('');
  }

  getHackerNews(q: string):any {
    this.hackernewsService.getQuery(q).subscribe(response => {
      this.qHackerNews = response;
      this.getSubmissionCount(response.hits);
    })
  }

  getSubmissionCount(response) {
    response.forEach(item => {
      if(this.authorSubmissions.indexOf(item.author) === -1){
        this.hackernewsService.getAuthor(item.author).subscribe(response => {
          let author = {
            "author": item.author,
            "submissions": response.submission_count
          }
          this.authorSubmissions.push(author)
        })
      }
    });
  }

  getCount(author:string){
    let count = this.authorSubmissions.find(x => x.author == author)
    if(count != undefined || count != null){
      return count.submissions;
    }
    return 0
  }

  search() {
    console.log(this.searchInput);
    this.getHackerNews(this.searchInput);
  }
}
