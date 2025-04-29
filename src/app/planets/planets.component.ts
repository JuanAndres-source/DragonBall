import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: any[] = [];
  totalPages: number = 1;
  selectedPlanet: any = null;
  isModalOpen: boolean = false;
  currentPage: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPlanets(this.currentPage, 10).subscribe({
      next: (data) => {
        this.planets = data.items || data;
        this.totalPages = data.meta?.totalPages || 1;
        console.log(this.planets);
      },
      error: (error) => {
        console.error('Error fetching planets:', error);
      }
    });
  }

  closeModal(): void {
    this.selectedPlanet = null;
    this.isModalOpen = false;
  }

  openModal(planet: any): void {
    this.apiService.getPlanetById(planet.id).subscribe({
      next: (data) => {
        this.selectedPlanet = data;
        console.log(this.selectedPlanet);
      },
      error: (error) => {
        console.error('Error fetching planet details:', error);
      }
    });
    this.isModalOpen = true;
  }

  nextPage(): void {
    this.currentPage++;
    this.apiService.getPlanets(this.currentPage, 10).subscribe({
      next: (data) => {
        this.planets = data.items || data;
        console.log(this.planets);
      },
      error: (error) => {
        console.error('Error fetching planets:', error);
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.apiService.getPlanets(this.currentPage, 10).subscribe({
        next: (data) => {
          this.planets = data.items || data;
          console.log(this.planets);
        },
        error: (error) => {
          console.error('Error fetching planets:', error);
        }
      });
    }
  }
}
