import { Component, OnInit, Input } from '@angular/core';
import { Diagnosis } from 'src/app/models/diagnosis.model';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { Symptom } from 'src/app/models/symptom.model';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  @Input() diagnostic: Diagnosis;
  symptoms: Symptom[];

  constructor(private diagnosticService: DiagnosisService) { }

  ngOnInit(): void {
    this.diagnosticService.symptoms()
      .subscribe(res => {
        this.symptoms = res;
      });
  }

  getSpecialisationNames(spec: { ID: number, Name: string, SpecialistID: number }[]): string {
    return spec.map(v => v.Name).join(', ');
  }

  validate(id: number) {
    this.diagnosticService.validate(id)
      .subscribe(res => {
        this.diagnostic.Issue.valid = true;
      }, e => {

      });
  }

  getSymptomsNames(ids: Symptom[]): string[] {
    if (!this.symptoms) {
      return;
    }
    const symptoms = this.symptoms.filter(symptom => ids.includes(symptom));
    return symptoms.map(s => s.Name);
  }

}
