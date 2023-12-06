import { Request, Response} from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";

export const deleteTarea = async(req: Request<{id: string}>, res: Response<tareaModelType | {error: unknown} >) => {
    const id = req.params._id;
    try{
        const trabajador = await tareaModel.findByIdAndDelete(id);
        if(!trabajador){
            res.status(404).send({error: "Tarea not found"});
            return;
        }

        res.status(200).send("Tarea borrado correctamente");
    }catch(error){
        res.status(500).send(error);
    }
}