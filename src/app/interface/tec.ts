export interface ITec {
    _id:string;
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:number;
    descripcion:string;
    __v:number;
}

export interface ITecUpdate {
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:number;
    descripcion:string;
}
