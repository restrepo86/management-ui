import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter  } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import 'moment/locale/es';
import { cargaArchivoPaquetesServices } from './services/Services';
import Process from './stores/Process';
import CargaArchivoPaquetesStore from './stores/CargaArchivoPaquetesStore';
import './index.css';
import App from './App';

const process =  new Process();
const cargaArchivoPaquetesStore = new CargaArchivoPaquetesStore(cargaArchivoPaquetesServices, process);
const stores = { cargaArchivoPaquetesStore };

const routes = (
    <HashRouter>
        <ConfigProvider locale={es_ES}>
          <App stores={stores} />
        </ConfigProvider>
    </HashRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
