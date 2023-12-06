import { Request, Response} from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";

export const getTarea =async(req: Request<{id: string}>, res: Response<tareaModelType | {error: unknown} >) => {
    const id = req.params.id;
    try{
        const tarea = await tareaModel.findById(id);
        if(!tarea){
            res.status(404).send({error: "Tarea not found"})
            return;
        }
        res.status(200).send(tarea);
    }catch(error){
        res.status(500).send(error);
    }
}