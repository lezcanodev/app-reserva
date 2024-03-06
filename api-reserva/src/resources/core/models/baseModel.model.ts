

export abstract class BaseModel<Props>{

    protected constructor(private readonly props: Props) {}

    public getProps(): Props{
        return this.props;
    }

}