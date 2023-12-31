import { Request, Response } from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";
import { trabajadorModel } from "../../db/dbTrabajador.ts";
import { empresaModel } from "../../db/dbEmpresa.ts";

export const postTarea = async(req: Request<tareaModelType>, res:Response<tareaModelType | {error: unknown}>) => {
    try{
        const {nombre, estado, duracion, empresaID, trabajadorID} = req.body
        if(!nombre || !estado || !duracion || !empresaID || !trabajadorID){
            res.status(500).send({error:"All elements are required"});
        }

        const trabajadorexist = await trabajadorModel.findOne({_id: trabajadorID})
        if(!trabajadorexist) {
            res.status(500).send({error:"Worker not found"});
        }

        const empresaexist = await empresaModel.findOne({_id: empresaID})
        if(!empresaexist){
            res.status(500).send({error:"Business not found"});
        }

        
        const tarea = new tareaModel({nombre, estado, duracion, empresaID, trabajadorID})
        await tarea.save();

        res.status(200).send(tarea)
    }catch(error){
        res.status(500).send(error)
    }
}