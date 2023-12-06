import { Request, Response} from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";
import { Estados } from "../../types.ts";
export const cambiarStatus = async(req: Request<{id: string}>, res:Response<string | {errror: unknown}>) => {
    try{
        const id = req.params.id;
        const status = req.querry.status

        const tarea = await tareaModel.findById(id).exec();
        let tareaActualizada;
        if(!tarea){
            res.status(500).send({error:"Task not found"})
        }

        if(status == Estados.Closed){
            tareaActualizada = await tareaModel.findByIdAndDelete({id})
            req.status(200).send("Tarea en Close, se ha eliminado")
        }
        
        tareaActualizada = await tareaModel.findByIdAndUpdate( {id}, 
                                            {estado: status},
                                            {new: true})
        if(!tareaActualizada){    
            res.status(500).send({error: "Fallo el update de la tarea"})
        }else{
            req.status(200).send(tareaActualizada)
        }
    }catch(error){
        res.status(500).send(error)
    }
}