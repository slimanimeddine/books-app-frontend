import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const SignUp = ({
    handleSignUp,
    handleNameChange,
    handleUsernameChange,
    handlePasswordChange,
    name,
    username,
    password
}) => {
    return (
        <div>
            <h1>sign up</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    name
                    <input
                        type='text'
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    username
                    <input
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
                <button type="submit">sign up</button>
            </form>
            <div>
                already a member ?
                <Link to='/signin'>sign in</Link>
            </div>
        </div>
    )
}

SignUp.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default SignUp