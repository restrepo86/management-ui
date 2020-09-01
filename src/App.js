import React from 'react';
import Main from './views/Main';

const appStyle = {
    boxContainer : {
        border: '1px solid #ffac33',
        minWidth: '100px',
        maxWidth: '400px',
        margin: 'auto',
    },
    titleContainer: {
        textAlign: 'center',
        padding: '10px 5px 1px 15px',
        backgroundColor: '#ffac33',
    },
    windowTitle: {
        fontSize: 18,
        color: '#FFF'
    }
}

const App = (props) => (
    <div>
        <div style={appStyle.boxContainer}>
            <div style={appStyle.titleContainer}>
                <h1 style={appStyle.windowTitle}>Management App</h1>
            </div>
            <div style={{padding: 15}}>
                <Main {...props} />
            </div>
        </div>
    </div>
    );

export default App;
