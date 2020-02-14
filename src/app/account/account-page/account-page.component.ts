import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  stats: { patients: number, diagnostics: number };
  isLoading = false;

  constructor(private diagnosisService: DiagnosisService) { }

  ngOnInit(): void {
    // this.isLoading = true;
    // this.diagnosisService.stats()
    //   .subscribe(res => {
    //     this.isLoading = false;
    //     this.stats = res.body;
    //   }, e => {
    //     this.isLoading = false;
    //   });
  }

}
