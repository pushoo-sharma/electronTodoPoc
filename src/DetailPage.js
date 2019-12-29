import React, { Component } from 'react';
import DB from './db';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


class DetailPage extends Component {
    constructor(props) {
        super(props);

        let db = new DB();
        this.state = {
            db,
            setPropsRecieved: '',
            message: 'Print'
        }
    }
    async componentDidMount() {
        const notes = await this.state.db.getAllNotes();
        console.log('Notes ',notes);
        this.setState({
            setPropsRecieved: this.props.location.state,
            ...this.state.message
        })
        ipcRenderer.on('wrote-pdf', (event, path) => {
            const message = `Wrote pdf to : ${path}`;
            this.setState({
                ...this.state.setPropsRecieved,
                message
            })
        })
    }
    handleClick = () => {
        ipcRenderer.send('print-to-pdf');
    }
    render() {
        console.log(this.state.setPropsRecieved);
        return (
            <React.Fragment>
                <h1>DetailPage</h1>
                <h2>{this.state.setPropsRecieved.myProp}</h2>
                <button onClick={() => this.handleClick()}>{this.state.message}</button>
            </React.Fragment >
        );
    }
}

export default DetailPage;