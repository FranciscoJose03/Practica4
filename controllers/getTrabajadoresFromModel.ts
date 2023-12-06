import { Trabajador } from "../types.ts";
import { trabajadorModelType } from "../db/dbTrabajador.ts";
import { tareaModel } from "../db/dbTarea.ts";
import { empresaModel } from "../db/dbEmpresa.ts";

export const getTrabajadorFromModel = async(trabajador: trabajadorModelType): Promise<Trabajador> => {
    const {_id, name, DNI, email, telefono, empresaID, tareasID} = trabajador

    const empresa = await empresaModel.findById(empresaID);
    if(!empresa) throw new Error("Empresa not found");

    const tareas = await tareaModel.find({_id: {$in: tareasID}});
    if(!tareas) throw new Error("Tarea not found");

    return{
        id: _id.toString,
        name,
        DNI,
        email,
        telefono,
        empresa: {
            id: empresa._id.toString(),
            name: empresa.name,
        },
        tareas: tareas.map((tarea) => ({
            id: tarea._id.toString(),
            estado: tarea.estado,
            duracion: tarea.duracion
        }))
    }
}