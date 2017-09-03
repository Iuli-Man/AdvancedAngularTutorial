import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private afd: AngularFireDatabase){
  }

  ngOnInit() {
    this.cuisines = this.afd.list('/cuisines', {
      query: {
        orderByValue: true
      }
    });

    this.restaurants = this.afd.list('/restaurants',{
      query: {
        orderByChild: 'rating',
        equalTo: 5,
        limitToFirst: 50
      }
    })
      .map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.featureTypes = [];
          for (var f in restaurant.features)
            restaurant.featureTypes.push(this.afd.object('/features/' + f))
        });
        return restaurants;
      });

      this.exists = this.afd.object('/restaurants/1/features/1');

      this.exists.take(1).subscribe(x => {
        console.log(x);
        if(x && x.$value) console.log("EXISTS");
        else console.log("NOT EXISTS");
      });

      this.afd.list('/restaurants').push({name: ''}).then(x => {
        // x.key
        let restaurant = { name: 'My New Restaurant' };
        let update = {};
        update['restaurants/'+ x.key] = null;
        update['restaurants-by-city/camberwell/' + x.key] = null;

        this.afd.object('/').update(update);
      })
  }
}
