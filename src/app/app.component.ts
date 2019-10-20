import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';

  card = this.GlobalService.card;
  count = 1;
  selectedCard: number;

  readonly ROOT_URL = 'https://pokeapi.co/api/v2/pokemon/';
  response: any;

  constructor( private GlobalService: GlobalService, private http: HttpClient ) { }

 
  ngOnInit() {

    this.getPosts();
}

  getPosts() {
   for(let i = 0; i < 9; i++) {
     this.http.get(this.ROOT_URL + `${this.count}`)
     .subscribe( response => {
       this.response = response;
       this.GlobalService.card.push(
        {
            name: this.response.name,
            photo: this.response.sprites.front_default,
            weight: this.response.weight,
            moves: this.response.moves.length,
            types: this.response.types,
            index:  this.response.id,
            height: this.response.height,
            baseEx: this.response.base_experience
        }
      );
     });
     this.count++;
    }
  }

  selectCard(qq: any){
    this.selectedCard = qq.id;
    document.getElementById('description').style.display = 'block';
  }
}


