import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Management from './containers/Management';

const Main = (props) => (
    <main>
        <Switch>
            <Route exact path="/" render={(routeProps) => (
              <Management {...routeProps} {...props} />
            )}/>
        </Switch>
    </main>
);

export default Main;
