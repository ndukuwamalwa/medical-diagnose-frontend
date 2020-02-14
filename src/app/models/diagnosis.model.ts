import { Symptom } from './symptom.model';

export interface Diagnosis {
    Issue: {
        ID: number,
        Name: string,
        ProfName: string,
        Icd: string,
        IcdName: string,
        Accuracy: number,
        gender?: string;
        year_of_birth?: number;
        symptoms?: Symptom[],
        valid?: boolean
    };
    Specialisation: {
        ID: number,
        Name: string,
        SpecialistID: number
    }[];
}
