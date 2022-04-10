import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Notification from './components/Notification'
import Footer from './components/Footer'

import bookService from './services/books'
import shelfService from './services/shelves'
import userService from './services/users'
import signInService from './services/signin'

const App = () => {
    const [books, setBooks] = useState([])
    const [shelves, setShelves] = useState([])
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBookAppUser')))
    const [notifMessage, setNotifMessage] = useState('')
    const [notifClass, setNotifClass] = useState('')
    let navigate = useNavigate()

    useEffect(async () => {
        const initialBooks = await bookService.getAll()
        setBooks(initialBooks)
    }, [])

    useEffect(async () => {
        const initialShelves = await shelfService.getAll()
        setShelves(initialShelves)
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBookAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          bookService.setToken(user.token)
        }
    }, [])

    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            const user = await signInService.signIn({
                username, password
            })
            setUser(user)
            bookService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBookAppUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            navigate('/', { replace: true })
        } catch (error) {
            setNotifMessage(error.response.data.error.toString())
            setNotifClass('error')
            setTimeout(() => {
                setNotifMessage('')
                setNotifClass('')
            }, 5000)
        }
    }

    const handleSignOut = () => {
        setUser(null)
		bookService.setToken(null)
		window.localStorage.removeItem('loggedBookAppUser')
    }

    const handleSignUp = async (event) => {
        event.preventDefault()
        try {
            await userService.addUser({
                name, username, password
            })
            setUsername('')
            setPassword('')
            navigate('/', { replace: true })
        } catch (error) {
            setNotifMessage(error.response.data.error.toString())
            setNotifClass('error')
            setTimeout(() => {
                setNotifMessage('')
                setNotifClass('')
            }, 5000)            
        }
    }

    return (
        <div>
            <Notification message={notifMessage} className={notifClass} />
            <Routes>
                <Route path='/' element={user
                ? <Home 
                    username={user.username} 
                    handleSignOut={handleSignOut}
                    />
                : <Navigate replace={true} to="/signin" />}
                />

                <Route path='/signin' element={!user
                ? <SignIn 
                        handleSignIn={handleSignIn}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        username={username}
                        password={password}/>
                : <Navigate replace={true} to="/" />
                }/>

                <Route path='/signup' element={!user
                ? <SignUp
                    handleSignUp={handleSignUp}
                    handleNameChange={({ target }) => setName(target.value)}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    name={name}
                    username={username}
                    password={password}/>
                : <Navigate replace={true} to="/" />
                }/>
            </Routes>
            <Footer />
        </div>
    )
}

export default App