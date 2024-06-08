export class BaseError extends Error {
 public readonly name: string;
 public readonly isTechnical: boolean

 constructor(name: string,description: string, isTechnical: boolean, message:string) {
   super(description);
   Object.setPrototypeOf(this, new.target.prototype);
   this.name = name;
   this.isTechnical = isTechnical;
   Error.captureStackTrace(this);
   this.message = message
 }
}


export class ENVError extends BaseError {
  constructor(name:string,  description:string, message:string){
    super(name, description, true , message)
  } 
}


