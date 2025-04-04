import React from 'react'
class Welcome extends React.Component {
    constructor() {
        super()
        this.state = { name: "Subhajit", place: "Kolkata" }
    }
    updateState = () => {
        this.setState({ name: "Xeon", place: "Baricha" })
    }
    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h1> {this.state.place}</h1>
                <button onClick={this.updateState}>Click Here</button>
            </div>
        );
    }
}
export default Welcome;