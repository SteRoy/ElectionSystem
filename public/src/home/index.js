import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            emailAddress: ""
        }
    }

    submitEmail() {
        return false;
    }

    render() {
        return (
            <div className="container" style={{"textAlign": "center"}}>
                <h1>Durham Union Society Presidential Election</h1>
                <hr/>
                <h4>Already a member of the Durham Union Society? Enter your email address below to get voting!</h4>
                <div className="row">
                    <input type="text" name="email" id="email" placeholder="Your DUS Email Address"/>
                    <button className="btn btn-primary" onClick={this.submitEmail.bind(this)}>Vote</button>
                </div>
                <h7>(If you're not a member yet then head on over to <a href={"https://dus.upmind.app/auth/register"}>our website!</a></h7>
            </div>
        )
    }
}

export default Home;