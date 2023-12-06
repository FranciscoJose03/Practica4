import { Request, Response} from "express";
import { empresaModel, empresaModelType } from "../../db/dbEmpresa.ts";
import { trabajadorModel } from "../../db/dbTrabajador.ts";

export const contratarTrabajador = async(req: Request <{id: string, workerId: string}>, res: Response< string| {error:unknown}>) => {
    try{
        const id = req.params.id;
        const workwerId = req.params.workwerId;

        const empresa = await empresaModel.findById(id).exec();
        if(!empresa){
            res.status(500).send({error: "Empresa not found"})
        }

        const trabajador = await trabajadorModel.findById(workwerId).exec();

        if(!trabajador){
            res.status(500).send({error: "Trabajador not found"})
        }else{
            if(trabajador.empresaID !== null){
                res.status(500).send({error: "Trabajador ya esta contratado"})
            }
        }

        await empresaModel.findOneAndUpdate({_id: id},
                                            {$push: {trabajadoresID: workwerId}},
                                            {new: true})
        
        res.status(200).send("Has contratado al cliente")                                            

    }catch(error){
        res.status(500).send(error)
    }
}
