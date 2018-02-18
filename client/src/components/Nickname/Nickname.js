import React from 'react';
import { PropTypes } from 'prop-types';

export default class Nickname extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            // room: 'lobby'
            //users: []
        };    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({username: event.target.value});
    }
    
    handleSubmit(event) {
        const { socket } = this.context;
        event.preventDefault();
        //this.setState({username: event.target.value});
        console.log(event);
        socket.emit('adduser', this.state.username, (available) => {
            if (!available) {
                this.state.username = '';
            } else {
                this.props.onInput();
            }
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="nick-window">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-box">
                        <input type="text" className="inputs" placeholder="Enter your nickname" onChange={this.handleChange} />
                        <input type="submit" className="inputs" id="enterbutton" value="▶" className="input input-big" />
                    </div>
                </form>
            </div>
        );
    }
};
//<button type="button" className="btn pull-right" onClick={() => this.handleSubmit()}>Submit</button>
                    
Nickname.contextTypes = {
    socket: PropTypes.object.isRequired
};

