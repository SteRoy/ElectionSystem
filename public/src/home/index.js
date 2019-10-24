import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            error: ""
        }
    }

    updateEmail(event) {
        this.setState({
            emailAddress: [event.target.value]
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    submitEmail() {
        if (!this.validateEmail(this.state.emailAddress)) {
            this.setState({
                error: "You must use a valid email address."
            });
        } else {
            this.setState({
                error: ""
            });
            alert(this.state.emailAddress);
        }
        return false;
    }

    render() {
        return (
            <div className="container" style={{"textAlign": "center"}}>
                <h1>Durham Union Society Presidential Election</h1>
                <hr/>
                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : ""}
                <h4>Already a member of the Durham Union Society? Enter your email address below to get voting!</h4>
                <div className="form-group">
                    <input className="form-control" type="text" name="email" id="email" onChange={this.updateEmail.bind(this)} placeholder="Your DUS Email Address"/>
                    <button className="btn btn-primary form-control" onClick={this.submitEmail.bind(this)}>Vote</button>
                </div>
                <h7>(If you're not a member yet then head on over to <a href={"https://dus.upmind.app/auth/register"}>our website!)</a></h7>
            </div>
        )
    }
}

export default Home;