export interface IProveedor {
    _id:string;
    codigo:string;
    cedula:string;
    ingreso:string;
    proveedor:string;
    primerApellido:string;
    segundoApellido:string;
    correo: string;
    direccion: string;
    telOficina: string;
    telPersonal: string;
    productos: any;
    nombreContacto: string;
    telContacto: string;
    correoContacto: string;
    __v:number;
}

export interface IProveedorUpdate {
    codigo:string;
    cedula:string;
    ingreso:string;
    proveedor:string;
    primerApellido:string;
    segundoApellido:string;
    correo: string;
    direccion: string;
    telOficina: string;
    telPersonal: string;
    productos: any;
    nombreContacto: string;
    telContacto: string;
    correoContacto: string;
}
