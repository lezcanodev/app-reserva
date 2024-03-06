import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { Request, Response } from 'express';



export default abstract class BaseController{

    protected abstract execute(req: Request, res: Response): Promise<void>;

    public async handle(req: Request, res: Response){
        try{
            await this.execute(req, res);
        }catch(error: unknown){
            console.log(error);
            res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.code).json({
                message: HTTP_RESPONSES.INTERNAL_SERVER_ERROR.message
            })
        }
    }

}