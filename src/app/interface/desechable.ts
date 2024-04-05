export interface IDesechable {
    _id:string;
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:string;
    descripcion:string;
    __v:number;
}

export interface IDesechableUpdate {
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:string;
    descripcion:string;
}
