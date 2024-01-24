import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  WithFieldValue,
  DocumentData,
  query,
  where,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameListService {

  //unsubGames;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {
    //this.unsubGames = this.subGamesList();
  }

  ngonDestroy() {
    //this.unsubGames;
  }

  subGamesList() {
    //const q = query(this.getNotesRef(), where('marked', '==', false), orderBy('title'), limit(100));
    //const q = query(this.getSingleDocRef(), where('games', '==', 'GHPyJvaOR0eZO4jZfHdv'));

    //return onSnapshot(this.getGamesRef(), (list) => {
    return onSnapshot(
      this.getSingleDocRef('games', 'GHPyJvaOR0eZO4jZfHdv'),
      (list) => {
        console.log(list);
      }
    );
  }

  getGameData(gameId: string): Observable<DocumentData> {
    const docRef = this.getSingleDocRef('games', gameId);

    return new Observable<DocumentData>((observer) => {
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        const data = snapshot.data();
        observer.next(data);
      });

      return () => unsubscribe();
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  // Insert-Funktion
  async addGame(item: object) {
    await addDoc(this.getGamesRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        //console.log('Document written with ID: ', docRef?.id);
        this.router.navigateByUrl('/game/' + docRef?.id);
      });
  }
}
