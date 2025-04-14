import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-characters',
  imports: [CommonModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})

export class CharactersComponent implements OnInit{
  characters: any[] = [];
  totalPages: number = 1;
  selectedCharacter: any = null;
  isModalOpen: boolean = false;
  currentPage: number = 1;
  transformations: any[] = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getCharacters(this.currentPage, 10).subscribe({
      next: (data) => {
        this.characters = data.items || data;
        this.totalPages = data.meta.totalPages || 1; 
        console.log(this.characters);
    },
    error: (error)=>{
      console.error('Error fetching characters:', error);
    }
  });
  }

  closeModal():void{
    this.selectedCharacter = null;
    this.isModalOpen = false;
  }
  openModal(character: any): void{
    this.apiService.getCharacterById(character.id).subscribe({
      next: (data) => {
        this.selectedCharacter = data;
        this.transformations = data.transformations || []; 
        console.log(this.selectedCharacter);
      },
      error: (error) => {
        console.error('Error fetching character details:', error);
      }
    });
    this.isModalOpen = true;
  }

  nextPage(): void {
    this.currentPage++;
    this.apiService.getCharacters(this.currentPage, 10).subscribe({
      next: (data) => {
        this.characters = data.items || data;
        console.log(this.characters);
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
      }
    });
}
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.apiService.getCharacters(this.currentPage, 10).subscribe({
        next: (data) => {
          this.characters = data.items || data;
          console.log(this.characters);
        },
        error: (error) => {
          console.error('Error fetching characters:', error);
        }
      });
    }
  }
}
