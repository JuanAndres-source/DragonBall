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

  colors :{[key: string]: string} = {
    'Saiyan': 'rgb(248, 122, 4)',
    'Namekian': 'rgb(114, 255, 114)',
    'Human': 'rgb(251, 208, 175)',
    'Android': 'rgb(43, 251, 168)',
    'Frieza Race': 'rgb(178, 113, 252)',
    'Majin': 'rgb(252, 147, 249)',
    'Other': 'rgb(255, 255, 255)',
    'God': 'rgb(103, 214, 254)',
    'Demon': '#392F5A',
    'Angel': 'rgb(203, 251, 226)',
    'Jiren Race': 'rgb(253, 81, 81)',
  }

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
        if(this.selectedCharacter.race in this.colors){
          const modal = document.getElementById('modal');
          if (modal) {
            modal.style.backgroundColor = this.colors[this.selectedCharacter.race];
            modal.style.boxShadow =  `0px 4px 15px ${this.colors[this.selectedCharacter.race]}`;
          }
        }
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