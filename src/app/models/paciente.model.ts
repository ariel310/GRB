export class Paciente {

    constructor(
        public nombre?: string,
        public apellido?: string,
        public telCelular?: string,
        public telFijo?: string,
        public email?: string,
        public os?: string,
        public planOS?: string,
        public afiliado?: string,
        public domicilio?: string,
        public fechaNac?: Date,
        public sexo?: string,
        public profesion?: string,
        public dni?: string,
        public usuario?: string,
        public _id?: string
    ) { }
}
