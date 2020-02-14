import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { PatientInfo } from 'src/app/models/patient-info.model';
import { Diagnosis } from 'src/app/models/diagnosis.model';
import { Symptom } from 'src/app/models/symptom.model';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {
  diagnoseErrror: string;
  isLoading = false;
  isGettingSymptoms = false;
  form = this.fb.group({
    year_of_birth: ['', [Validators.required, Validators.pattern(/[0-9]{1,}/i)]],
    gender: ['', [Validators.required]],
    symptoms: ['', [Validators.required]]
  });
  diagnostics: Diagnosis[];
  symptoms: Symptom[];
  selectedSymptoms: Symptom[] = [];

  constructor(
    private fb: FormBuilder,
    private diagnoseService: DiagnosisService
  ) { }

  ngOnInit(): void {
    this.isGettingSymptoms = true;
    this.diagnoseService.symptoms()
      .subscribe(res => {
        this.isGettingSymptoms = false;
        this.symptoms = res;
      }, e => {
        this.isGettingSymptoms = false;
      });
  }

  diagnose(form: FormGroup) {
    this.isLoading = true;
    const value: PatientInfo = form.value;
    value.symptoms = this.selectedSymptoms.map(s => s.ID);
    this.diagnoseService.diagnose(value)
      .subscribe(res => {
        this.isLoading = false;
        this.diagnoseErrror = undefined;
        this.diagnostics = res;
      }, e => {
        this.isLoading = false;
        if (e.status === 404) {
          this.diagnoseErrror = `No matching diseases found.`;
        } else {
          this.diagnoseErrror = `Request failed. Please retry.`;
        }
      });
  }

  onSelectSymptom(id: number) {
    const exists = this.selectedSymptoms.find(s => s.ID === +id);
    if (exists) {
      return;
    }
    const symptom = this.symptoms.find(s => s.ID === +id);
    this.selectedSymptoms.push(symptom);
  }

  removeSymptom(symptom: Symptom) {
    this.selectedSymptoms.splice(this.selectedSymptoms.indexOf(symptom), 1);
  }

}
