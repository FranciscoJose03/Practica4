import { Request, Response} from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";

export const deleteEmpresa = async(req: Request<{id: string}>, res: Response<empresaModelType | {error: unknown} >) => {
    const id = req.params.id;
    try{
        const trabajador = await empresaModel.findByIdAndDelete(id);
        if(!trabajador){
            res.status(404).send({error: "Tarea not found"});
            return;
        }

        res.status(200).send("Tarea borrado correctamente");
    }catch(error){
        res.status(500).send(error);
    }
}