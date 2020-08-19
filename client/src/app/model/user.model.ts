export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public userName?: string,
    public from?: string,
    public til?: string,
    public paymentId?: string,

    public phone?: string,
    public street?: string,
    public street2?: string,
    public landlord?: number,
    public avatar?: string,
    public admin?: number,
    public banned?: boolean,

    public request?: string,
    public reject?: string,
    public accept?: string,
    public userRequest?: string[],
    public _id?: string

  ) { }
}
