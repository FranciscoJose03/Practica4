import { Request, Response} from "express";
import { trabajadorModel, trabajadorModelType } from "../../db/dbTrabajador.ts";

export const getTrabajadores = async (req: Request, res: Response<trabajadorModelType[] | {error: unknown}>) => {
    try{
        const trabajadores = await trabajadorModel.find()
        res.status(200).send(trabajadores);
    }catch(error){
        res.status(500).send(error)
    }
}