import { User } from './user.model';
export class Property {
    constructor(

       //basic info
       public deposit?:number,
       public rooms?:number,
       public area?:number,
       public available?:Date,
       public title?:string,
       public description?:string,
       public rules?:string,
       public bathrooms?:number,

       public street?:string,
       public remain?:string,
       public vicinity?:string,
       public longitude?:number,
       public latitude?:number,

       //icons
       public internet?:boolean,
       public cableTV?:boolean,
       public bBed?:boolean,
       public sBed?:boolean,
       public conditioner?:boolean,
       public fridge?:boolean,
       public stove?:boolean,
       public washer?:boolean,
       public bathub?:boolean,
       public microwave?:boolean,
       public landline?:boolean,
       public fireplace?:boolean,

       //owner
       public user?:User,

       //images
       public image1?:string,
       public image2?:string,
       public image3?:string,
       public image4?:string,

       //date
       public date?:Date,

       public approved?:Number,
    ) {}
}
