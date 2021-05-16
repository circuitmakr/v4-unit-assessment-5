import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Form from './Components/Form/Form';
import Dash from './Components/Dash/Dash';
import Post from './Components/Post/Post';

export default(
    <Switch>
        <Route component={Auth} exact path="/" />
        <Route component={Dash} path="/dash" />
        <Route component={Post} path="/post:id" />
        <Route component={Form} path="/form" />
    </Switch>
);