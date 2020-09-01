class ArchivoDTO {

    archivoDetalleTrabajo;
    cedulaParticipante;

    constructor(cedulaParticipante, archivoDetalleTrabajo) {
        this.archivoDetalleTrabajo = archivoDetalleTrabajo;
        this.cedulaParticipante = cedulaParticipante;
    };

}

export default ArchivoDTO;