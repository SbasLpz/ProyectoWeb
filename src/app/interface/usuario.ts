export interface IUsuario {
    _id:string;
    codigo:string;
    nombre:string;
    primerApellido:string;
    segundoApellido:string;
    tel1:string;
    usuario:string;
    contra:string;
    privilegios:any;
    __v:number;
}

export interface IUsuarioUpdate {
    _id:string;
    codigo:string;
    nombre:string;
    primerApellido:string;
    segundoApellido:string;
    tel1:string;
    usuario:string;
    contra:string;
    privilegios:any;
    __v:number;
}
