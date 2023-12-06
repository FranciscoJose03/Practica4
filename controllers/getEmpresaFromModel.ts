import { Empresa } from "../types.ts";
import { empresaModelType } from "../db/dbEmpresa.ts";
import { tareaModel } from "../db/dbTarea.ts";
import { trabajadorModel } from "../db/dbTrabajador.ts";

export const getEmpresaFromModel = async (empresa: empresaModelType): Promise<Empresa> => {
    const {_id, name, trabajadoresID} = empresa;

    const trabajadores = await trabajadorModel.find({ _id: {$in: trabajadoresID}});
    if (!trabajadores) throw new Error("Trabajador not found")

    return{
        id: _id.toString(),
        name,
        trabajadores: trabajadores.map((trabajador) => ({
            id: trabajador._id.toString()
        }))
    }
}