import { Component } from "react";
import { userService } from "../services/userService";

export class Login extends Component {

    state = {
        username: '',
        password: '123',
    }

    onSaveUser = () => {
        const user = this.state
        userService.signUp(user)
        const { onSignUp } = this.props
        onSignUp(user)
    }

    handleChange = ({ target }) => {
        this.setState({ username: target.value })
    }

    render() {
        return (
            <section className="welcome-container">
                <div className="Login-container">
                    <span className="title">Welcome to Infocrypt</span>
                    <span className="username">Please enter a username</span>
                    <div className="create-user">
                        <input type="text" username="username" id="username" placeholder="Username"
                            onChange={this.handleChange} />
                        <button onClick={this.onSaveUser}>Create user</button>
                    </div>
                </div>
                <div className="welcome-img">
                    <img src={require(`../assets/img/welcome-login.png`)} alt="crypto-city"></img>
                </div>
            </section>
        )
    }
};
