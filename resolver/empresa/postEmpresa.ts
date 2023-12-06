import { Request, Response } from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";

export const postEmpresa = async(req: Request<empresaModelType>, res:Response<empresaModelType | {error: unknown}>) => {
    try{
        const{name} = req.body;
        if(!name){
            throw new Error("Name or type are required");
        }

        const alreadyexist = await empresaModel.find({name: name})

        if(alreadyexist){
            throw new Error("The business have the same name than otherone")
        }

        const empresa = new empresaModel({name})
        await empresa.save();

        res.status(200).send(empresa)
    }catch(error){
        res.status(500).send(error)
    }
}