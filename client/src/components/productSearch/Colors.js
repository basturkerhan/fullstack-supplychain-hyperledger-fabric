import React, { Component } from 'react'

export class Colors extends Component {
    render() {
        const {color} = this.props;
        return (
            <div className="colors">
                <button style={{background: color}}></button>
            </div>
        )
    }
}

export default Colors