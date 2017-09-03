import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  cuisines: FirebaseListObservable<any[]>;
  restaurant;

  constructor(private afd: AngularFireDatabase) {
  }

  ngOnInit() {
    this.cuisines = this.afd.list('/cuisines');
    this.restaurant = this.afd.object('/restaurant');
  }

  add() {
    this.cuisines.push({
      name: 'Asian'
    });
  }

  update() {
    this.afd.object('/restaurant').update({
      name: 'New Name',
      rating: 5
    })
  }

  set() {
    this.afd.object('/favorites/1/10').set(null);
  }

  remove() {
    this.afd.object('/restaurant').remove()
      .then(x => console.log("SUCCESS"))
      .catch(error => console.log("ERROR", error));
  }

}
