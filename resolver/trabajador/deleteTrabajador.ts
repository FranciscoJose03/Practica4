import { Request, Response} from "express";
import { trabajadorModel, trabajadorModelType } from "../../db/dbTrabajador.ts";

export const deleteTrabajador = async(req: Request<{id: string}>, res: Response<trabajadorModelType | {error: unknown} >) => {
    const id = req.params.id;
    try{
        const trabajador = await trabajadorModel.findByIdAndDelete(id);
        if(!trabajador){
            res.status(404).send({error: "Trabajador not found"});
            return;
        }

        res.status(200).send("Trabajador borrado correctamente");
    }catch(error){
        res.status(500).send(error);
    }
}