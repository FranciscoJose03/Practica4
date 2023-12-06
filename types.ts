export type Empresa = {
    id: string;
    name: string;
    trabajadores: Array<Omit<Trabajador, "empresa">>;
}

export type Trabajador = {
    id: string;
    name: string;
    DNI: string;
    email: string;
    telefono: number;
    empresa: Omit<Empresa,"empresa">;
    tareas: Array<Omit<Tarea, "tarea">>
}

export type Tarea = {
    id: string;
    estado: string;
    duracion: number;
    trabajador: Omit<Trabajador, "trabajador">;
    empresera: Omit<Empresa, "empresa">;
}

export enum Estados{
    ToDo = "ToDo",
    InProgress = "InProgress",
    InTest = "Intest",
    Closed = "Closed"
}