import { User } from './user.model';
export class Property {
    constructor(

       //basic info
       public deposit?:number,
       public monthly?:number,
       public rooms?:number,
       public area?:number,
       public available?:Date,
       public minstay?:number,
       public maxstay?:number,
       public title?:string,
       public description?:string,
       public rules?:string,
       public documents?:string,
       public landlordrules?:string,
       public bathrooms?:number,

       public electricity?:string,
       public water?:string,
       public gas?:string,
       public wifi?:string,

       public street?:string,
       public remain?:string,
       public vicinity?:string,
       public longitude?:number,
       public latitude?:number,

       public address_object?:string,
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
       public image5?:string,

       //date
       public date?:Date,

       public approved?:Number,
    ) {}
}
