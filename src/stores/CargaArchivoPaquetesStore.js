import { observable, runInAction, action, autorun } from 'mobx';
import FileSaver from 'file-saver';

export default class CargaArchivoPaquetesStore {

  @observable process;
  @observable cargaArchivoPaquetesSevice;
  @observable salidaDetalleBolsasDiaData;

  constructor(cargaArchivoPaquetesSevice, process) {
    this.process = process;
    this.cargaArchivoPaquetesSevice = cargaArchivoPaquetesSevice;
  }

  @action
  cargarArchivoDetalleTrabajo = (archivoDetalleTrabajo) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'PROCESANDO ARCHIVO ...';
    this.cargaArchivoPaquetesSevice.cargarArchivoDetalleTrabajo(archivoDetalleTrabajo)
        .then(response => {
          runInAction(() => {
            const { data } = response;
            this.salidaDetalleBolsasDiaData = data;
            this.process.processDTO.loading = false;
            this.process.showMessage("Archivo Procesado Correctamente", 'success');
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

  download = autorun(() => {
    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear();
    if (this.salidaDetalleBolsasDiaData) {
      const blob = new Blob([this.salidaDetalleBolsasDiaData], { 'type': 'application/vnd.ms-excel' });
      FileSaver.saveAs(
         blob,
          'SalidaDetalleBolsasPorDia-'
            .concat(formatted_date)
            .concat('.txt')
      );
      this.salidaDetalleBolsasDiaData = null;
    }
    this.fileBytes = null;
  });


}
