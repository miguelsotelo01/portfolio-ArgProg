import { Persona } from "./persona";
export interface Proyectos {
    id: number;
    nombre: string;
    descripcion: string;
    urlImagen: string;
    urlProyecto: string;
    persona: Persona;
}
