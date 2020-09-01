import React, { Component } from 'react';
import CargaArchivo from '../../components/CargaArchivo';
import Progress from '../../components/Progress';
import './style.css'
import { observer } from 'mobx-react';

@observer
class Management extends Component {

    render() {

        return(

            <div>
                <Progress { ...this.props.stores.cargaArchivoPaquetesStore.process.getData() }/>
                <div id = 'cargaArchivo'>
                    <CargaArchivo { ...this.props }/> 
                </div>
            </div>

        );

    };

};

export default Management;