import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameListService {
  unsubGames;
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubGames = this.subGamesList();     
  }

  ngonDestroy() {
    this.unsubGames;
  }

  subGamesList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      list.forEach((element) => {
        console.log(element.id);
      });
      list.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("Game update", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Game modified", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Game removed", change.doc.data());
        }
      });
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  // Insert-Funktion
  async addGame() {
    await addDoc(this.getGamesRef(), {'Hallo':'Welt'})
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }

}
