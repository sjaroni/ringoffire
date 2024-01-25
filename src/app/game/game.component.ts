import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GameListService } from '../firebase-service/game-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    DialogAddPlayerComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {  
  game: Game = new Game();
  gameId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      if (this.gameId !== undefined) {
        this.gameService.getGameData(this.gameId).subscribe((data) => {
          //console.log('Game Data in Component:', data);
          this.game.currentPlayer = data['currentPlayer'];
          this.game.playedCards = data['playedCards'];
          this.game.players = data['players'];
          this.game.stack = data['stack'];
          this.game.pickCardAnimation = data['pickCardAnimation'];
          this.game.currentCard = data['currentCard'];
        });
      }
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      this.saveGame();

      setTimeout(() => {
        if (this.game.currentCard != undefined) {
          this.game.playedCards.push(this.game.currentCard);
        }
        this.game.currentPlayer++;
        this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    if (this.gameId !== undefined) {
      this.gameService.saveGameData(this.gameId, this.game.toJson());
    }
  }
}
