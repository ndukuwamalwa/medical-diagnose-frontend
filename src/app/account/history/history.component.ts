import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { Diagnosis } from 'src/app/models/diagnosis.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  isLoading = false;
  diagnosis: Diagnosis[];

  constructor(private diaService: DiagnosisService) { }

  ngOnInit(): void {
  }

  viewHistory(f: NgForm) {
    this.isLoading = true;
    const value = f.value;
    const startDate = value.startDate;
    const endDate = value.endDate;
    this.diaService.history(startDate, endDate)
      .subscribe(res => {
        this.isLoading = false;
        this.diagnosis = res;
      }, e => {
        this.isLoading = false;
      });
  }

}
