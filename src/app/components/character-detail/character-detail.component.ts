import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service'; // ✅ RUTA CORREGIDA

@Component({
  selector: 'app-character-detail',
  standalone: true,
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  imports: [] // aquí puedes añadir CommonModule si usas *ngIf, etc.
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.characterService.getCharacterById(id).subscribe((data) => {
      this.character = data;
    });
  }
}