import { Request, Response} from "express";
import { trabajadorModel, trabajadorModelType } from "../../db/dbTrabajador.ts";

export const getTrabajador = async(req: Request<{id: string}>, res: Response<trabajadorModelType | {error: unknown} >) => {
    const id = req.params;
    try{
        const trabajador = await trabajadorModel.findById(id);
        if(!trabajador){
            res.status(404).send({error: "Trabajador not found"});
            return;
        }
        res.status(200).send(trabajador);
    }catch(error){
        res.status(500).send(error);
    }
}