import { observable, runInAction, action } from 'mobx';

export default class CargaArchivoPaquetesStore {

  @observable process;
  @observable cargaCanalAlternoService;
  @observable datosArchivosCargados = [];

  constructor(cargaArchivoPaquetesSevice, process) {
    this.process = process;
    this.cargaArchivoPaquetesSevice = cargaArchivoPaquetesSevice;
  }

  @action
  cargarArchivoDetalleTrabajo = (archivoDetalleTrabajo) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'CARGANDO ARCHIVO ...';
    this.cargaArchivoPaquetesSevice.cargarArchivoDetalleTrabajo(archivoDetalleTrabajo)
        .then(response => {
          runInAction(() => {
            const { data } = response;
            this.datosArchivosCargados.push(data);

            console.table(this.datosArchivosCargados);
            console.log('data', data);
            this.process.processDTO.loading = false;
            this.process.showMessage("Archivo Cargado Correctamente", 'success');
          });
        })
        .catch(error => {
          var message;
          if (error.response) {
            message = error.response.data.message 
          } else {
            console.log(error);
            message = 'No se pudo cargar archivo, intente nuevamente';
          }
          this.process.showMessage(message, 'error');
          this.process.processDTO.loading = false;
        });

  };


}
