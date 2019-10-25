import React from 'react';

class Thanks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" style={{"textAlign": "center"}}>
                <h1>Durham Union Society Presidential Election</h1>
                <hr/>
                <h4>Thanks for Voting!</h4>
            </div>
        )
    }
}

export default Thanks;