import { Request, Response} from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";

export const getEmpresa =async(req: Request<{id: string}>, res: Response<empresaModelType | {error: unknown} >) => {
    try{
        const id = req.params.id;
        const empresa = await empresaModel.findById(id).exec();
        if(!empresa){
            res.status(404).send({error: "Empresa not found"})
            return;
        }
        res.status(200).send(empresa);
    }catch(error){
        res.status(500).send(error);
    }
}