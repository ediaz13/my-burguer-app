// const { Component } = require("react");
import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary'

class BurguerBuilder extends Component {
    render () {
        return(
            <Aux>
                <div>Burguer</div>
                <div>Build controls</div>
            </Aux>
        );
    }

}

export default BurguerBuilder;