import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PlayinAround from './components/PlayinAround'

import bookService from './services/books'
import shelfService from './services/shelves'
import userService from './services/users'
import signInService from './services/signin'

const App = () => {
  const [books, setBooks] = useState([])
  const [shelves, setShelves] = useState([])
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBookAppUser')))
  const [notifMessage, setNotifMessage] = useState('')
  const [notifClass, setNotifClass] = useState('')
  let navigate = useNavigate()

  useEffect(async () => {
    const initialBooks = await bookService.getAllBooks()
    setBooks(initialBooks)
  }, [])

  useEffect(async () => {
    const initialShelves = await shelfService.getAllShelves()
    setShelves(initialShelves)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBookAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      bookService.setToken(user.token)
      shelfService.setToken(user.token)
    }
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()
    try {
      const user = await signInService.signIn({
        username,
        password
      })
      setUser(user)
      bookService.setToken(user.token)
      shelfService.setToken(user.token)
      window.localStorage.setItem('loggedBookAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setNotifMessage('Sign in successful')
      setNotifClass('success')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
        navigate('/', { replace: true })
      }, 5000)
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
        name,
        username,
        password
      })
      setUsername('')
      setPassword('')
      setNotifMessage('Account created successfully')
      setNotifClass('success')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
        
      }, 5000)
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 5000)
    } catch (error) {
      setNotifMessage(error.response.data.error.toString())
      setNotifClass('error')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
      }, 5000)
    }
  }

  const addShelf = async shelfObj => {
    try {
      const newShelf = await shelfService.addShelf(shelfObj)
      setShelves(shelves.concat(newShelf))  
      setNotifMessage(`shelf ${newShelf.name} added successfully`)  
      setNotifClass('success')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
        
      }, 5000)    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setNotifMessage(error.response.data.error.toString())
        setNotifClass('error')
        setTimeout(() => {
          setNotifMessage('')
          setNotifClass('')
        }, 5000)  
      } else {
        console.log(error)
      }
    }
  }

  const addBook = async bookObj => {
    try {
      const newBook = await bookService.addBook(bookObj)
      setBooks(books.concat(newBook))
      setNotifMessage(`book ${newBook.details.title} added successfully`)  
      setNotifClass('success')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
      }, 5000)    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setNotifMessage(error.response.data.error.toString())
        setNotifClass('error')
        setTimeout(() => {
          setNotifMessage('')
          setNotifClass('')
        }, 5000)  
      } else {
        console.log(error)
      }
    }
  }

  const updateBook = async (id, bookObj) => {
    try {
      const newBook = await bookService.updateBook(id, bookObj)
      setBooks(books.map(book => book.id !== id ? book : newBook))
      setNotifMessage(`book ${newBook.details.title} updated successfully`)  
      setNotifClass('success')
      setTimeout(() => {
        setNotifMessage('')
        setNotifClass('')
      }, 5000)    
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setNotifMessage(error.response.data.error.toString())
        setNotifClass('error')
        setTimeout(() => {
          setNotifMessage('')
          setNotifClass('')
        }, 5000)  
      } else {
        console.log(error)
      }
    }

  }

  const deleteBook = async id => {
    try {
      const updatedBooks = books.filter((v, i) => i !== id)
      setBooks(updatedBooks)
      await bookService.deleteBook(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home 
                username={user.username} 
                handleSignOut={handleSignOut} 
                books={books} 
                shelves={shelves}
                addShelf={addShelf}
                notifShelfMessage={notifMessage}
                notifShelfClass={notifClass}
                addBook={addBook}
                deleteBook={deleteBook}
                updateBook={updateBook}
                notifBookMessage={notifMessage}
                notifBookClass={notifClass}
                notifUpdateBookClass={notifClass}
                notifUpdateBookMessage={notifMessage}
              />
            ) : (
              <Navigate replace={true} to="/signin" />
            )
          }
        />

        <Route
          path="/signin"
          element={
            !user ? (
              <SignIn
                handleSignIn={handleSignIn}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                username={username}
                password={password}
                notifMessage={notifMessage}
                notifClass={notifClass}
              />
            ) : (
              <Navigate replace={true} to="/" />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !user ? (
              <SignUp
                handleSignUp={handleSignUp}
                handleNameChange={({ target }) => setName(target.value)}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                name={name}
                username={username}
                password={password}
                notifMessage={notifMessage}
                notifClass={notifClass}
              />
            ) : (
              <Navigate replace={true} to="/" />
            )
          }
        />
        <Route path="/playin" element={<PlayinAround />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
