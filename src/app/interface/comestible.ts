export interface IComestible {
    _id:string;
    codigo:string;
    nombre:string;
    cantidad:string;
    tipo:string;
    restaurante:string;
    marca:string;
    clase:string;
    linea:string;
    unidad:string;
    checked: boolean;
    __v:number;
}

export interface IComestibleUpdate {
    codigo:string;
    nombre:string;
    cantidad:string;
    tipo:string;
    restaurante:string;
    marca:string;
    clase:string;
    linea:string;
    unidad:string;
}
