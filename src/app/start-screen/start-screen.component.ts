import { Component } from '@angular/core';
import { GameListService } from '../firebase-service/game-list.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  constructor(private gameService: GameListService) {}

  newGame() {
    // Start game
    let game = new Game();
    this.gameService.addGame(game.toJson());
  }
}
