import ServiceBase from './ServiceBase';

class CargaArchivoPaquetesServices extends ServiceBase {
    
    constructor(urlServer) {
      super();
      this.headers = ''; 
      this.setHeaders();
      this.urlServer = urlServer;
      this.baseUrl = `${this.urlServer}/${this.urls.PAQUETES}/${this.urls.ALMACENAR_PAQUETES}`;
    }
    
    cargarArchivoDetalleTrabajo = async (archivoDetalleTrabajo) => {

      this.setHeaders();
      const requestUrl = `${this.baseUrl}`;
      return await this.postOctetStreamRequest(requestUrl, archivoDetalleTrabajo);
      
    };

}

export default CargaArchivoPaquetesServices;