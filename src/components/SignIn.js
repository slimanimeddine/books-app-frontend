import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const SignIn = ({
    handleSignIn,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    
    return (
        <div>
            <h1>sign in</h1>
            <form onSubmit={handleSignIn}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        onChange={handlePasswordChange} 
                    />
                </div>
                <button type="submit">sign in</button>
            </form>
            <div>
                not a member ?
                <Link to='/signup'>sign up</Link>
            </div>
        </div>
    )
}

SignIn.propTypes = {
    handleSignIn: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default SignIn