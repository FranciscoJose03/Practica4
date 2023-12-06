import { Request, Response} from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";
import { Estados } from "../../types.ts";
export const cambiarStatus = async(req: Request<{id: string}>, res:Response<tareaModelType | {errror: unknown}>) => {
    const id = req.params
    const estado = req.querry.status;
    try{
        const tarea = await tareaModel.find(id);
        let tareaActualizada;
        if(!tarea){
            throw new Error("Task not found")
        }

        if(estado != Estados.Closed){
            tareaActualizada = await tareaModel.findByIdAndUpdate( {id}, 
                                                {estado: estado},
                                                {new: true})
            if(!tareaActualizada){           
                throw new Error("Fallo el update de la tarea")
            }else{
                req.status(200).send(tareaActualizada)
            }
        }else{
            tareaActualizada = await tareaModel.findByIdAndDelete({id})
            req.status(200).send("Tarea en Close, se ha eliminado")
        }
    }catch(error){
        res.status(500).send(error)
    }
}