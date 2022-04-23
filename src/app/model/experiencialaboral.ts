import { Persona } from "./persona";
export interface Experiencia {
    id: number;
    puesto: string;
    nombreEmpresa: string;
    inicio: string;
    finalizacion: string;
    descripcion: string;
    persona: Persona;
}
