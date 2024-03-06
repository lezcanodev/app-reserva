


export abstract class ModelError extends Error{

    public constructor(message: string, name: string = 'error'){
        super(message);
        this.name = name;
    }

    public getErrorJson(){
        return {
            [this.name]: this.message
        }
    }
}   