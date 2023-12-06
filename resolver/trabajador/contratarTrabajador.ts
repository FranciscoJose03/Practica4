import { Request, Response} from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";
import { trabajadorModel } from "../../db/dbTrabajador.ts";

export const contratarTrabajador = async(req: Request <{id: string, workerId: string}>, res: Response< empresaModelType| {error:unknown}>) => {
    try{
        const id = req.params.id;
        const workwerId = req.params.workwerId;

        const empresa = await empresaModel.findById(id).exec()
        if(!empresa){
            throw new Error("Empresa not found")
        }

        const trabajador = await trabajadorModel.findById(workwerId).exec();
        if(!trabajador){
            throw new Error("Trabajador not found")
        }

        if(trabajador.empresaID != null){
            throw new Error("Trabajador ya esta contratado")
        }

        await empresaModel.findByIdAndUpdate({id},
                                            {$push: {trabajadoresID: workwerId}},
                                            {new: true})
        
        res.status(200).send(empresa)                                            

    }catch(error){
        res.status(500).send(error)
    }
}