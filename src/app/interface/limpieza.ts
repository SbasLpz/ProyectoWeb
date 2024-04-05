export interface ILimpieza {
    _id:string;
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:number;
    descripcion:string;
    tipo: string;
    cantidadMedida: number;
    unidad: string;
    __v:number;
}

export interface ILimpiezaUpdate {
    codigo:string;
    restaurante:string;
    nombre:string;
    marca:string;
    cantidad:number;
    descripcion:string;
    tipo: string;
    cantidadMedida: number;
    unidad: string;
}