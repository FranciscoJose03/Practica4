import { Request, Response } from "express";
import { tareaModel, tareaModelType } from "../../db/dbTarea.ts";

export const getTareas = async (req: Request, res: Response<tareaModelType[] | {error: unknown}>) => {
    try{
        const tareas = await tareaModel.find()
        res.status(200).send(tareas);
    }catch(error){
        res.status(500).send(error)
    }
}