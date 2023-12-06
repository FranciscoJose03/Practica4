import { Request, Response } from "express";
import { trabajadorModel, trabajadorModelType } from "../../db/dbTrabajador.ts";

export const postTrabajador = async(req: Request<trabajadorModelType>, res:Response<trabajadorModelType | {error: unknown}>) => {
    try{
        const {name, DNI, email, telefono } = req.body

        if(!name || !DNI || !email || !telefono){
            throw new Error("All elements are required");
        }

        const alreadyexist = await  trabajadorModel.find({DNI:DNI})
        if(alreadyexist){
            throw new Error("Worker has been created before");
        }

        const trabajador = new trabajadorModel({name, DNI, email, telefono})
        await trabajador.save()

        res.status(200).send(trabajador)
    }catch(error){
        res.status(500).send(error)
    }
}