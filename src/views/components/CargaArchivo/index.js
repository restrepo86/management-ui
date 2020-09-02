import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Button, Upload, Icon } from 'antd';
import './style.css'
import FormItem from 'antd/lib/form/FormItem';

@observer
class CargaArchivo extends React.Component {

    constructor(props) {
        super(props);
        this.cargaArchivoPaquetesStore = this.props.stores.cargaArchivoPaquetesStore;
        this.state = {
            fileList: [],
            cedulaParticipante: '',
        };
    };

    componentDidMount() {
        this.props.form.validateFields(); 
    };

    handleUpload = e => {
        const { fileList, cedulaParticipante } = this.state;
        const formData = new FormData();
        formData.append("archivoDetalleTrabajo", fileList[0]);
        formData.append("cedulaParticipante", cedulaParticipante);
        this.cargaArchivoPaquetesStore.cargarArchivoDetalleTrabajo(formData);
        this.setState({ fileList: [] });
    };

    handleChangeFileName(cedulaParticipante) {
        this.setState(state => ({ cedulaParticipante }));
    }; 

    validateExtension = (rule, { file }, callback) => {
        const isTxt = file.name.endsWith('.txt') || file.type === "text/plain"
        if (!isTxt) {
          return callback(new Error('Solo se permite cargar archivos con extension txt'));
        };
    };

    render() {

        const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
        const { fileList } = this.state;
        const nombreArchivoError = isFieldTouched('cedulaParticipante') && getFieldError('cedulaParticipante');
        const archivoError = isFieldTouched('archivo') && getFieldError('archivo');
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                const isTxt = file.name.endsWith('.txt') || file.type === "text/plain"
                if (isTxt) {
                 
                    this.setState(state => ({
                        fileList: [file],
                    }));
                    return false;  

                } else {
                    this.setState(state => ({
                        fileList: [],
                    }));
                }
            },
            fileList,
            multiple: false,
        };

        
        return(

            <div className="container">
                <Form className="input-form">
     
                            <Form.Item
                                validateStatus={nombreArchivoError ? 'error' : ''}
                                help={nombreArchivoError || ''}
                                label="Cédula Participante"
                            >
                                {getFieldDecorator('cedulaParticipante', {
                                    initialValue: this.state.cedulaParticipante || '',
                                    rules: 
                                    [
                                        { required: true, message: 'Por favor ingrese su número de cédula!' },                
                                    ],
                                })(
                                    <Input
                                        onChange={(event) => this.handleChangeFileName(event.target.value)}
                                    />,
                                )}
                            </Form.Item>
           
                            <Form.Item
                                validateStatus={archivoError ? 'error' : ''}
                                help={archivoError || ''}
                                label="Archivo"
                            >
                                {getFieldDecorator('archivo', {
                                    initialValue: null,
                                    rules: [
                                        { required: true, message: 'Este campo es requerido.' },
                                        { validator: this.validateExtension }
                                    ]
                                })(
                                    <Upload
                                        { ...props }
                                    >                     
                                        <Button
                                            block = { true }              
                                        >
                                            <Icon type="file-add" style={{ color: 'red' }} />
                                            Seleccione un Archivo
                                        </Button>
                                    </Upload>
                                )}
                            </Form.Item>
                        
                        <FormItem>
                            <Button
                                className="get-items-form-button"
                                type="primary"
                                onClick={ this.handleUpload }
                                icon="upload"
                                disabled={ !this.state.cedulaParticipante ||  this.state.fileList.length === 0 }
                            >
                                Cargar Archivo Detalle Trabajo
                            </Button>
                        </FormItem>
               
                </Form>
            </div>
        );

    }

}

const WrappedCargaArchivoForm = Form.create({ name: 'carga_archivo' })(CargaArchivo);
export default WrappedCargaArchivoForm;