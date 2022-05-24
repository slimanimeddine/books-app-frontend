import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import PlayinAround from './components/PlayinAround'
import Friends from './components/Friends'
import Shelves from './components/Shelves'
import Results from './components/Results'
import ResultsUsers from './components/ResultsUsers'

import bookService from './services/books'
import shelfService from './services/shelves'
import userService from './services/users'
import signInService from './services/signin'
import notificationService from './services/notifications'

const App = () => {
  const [books, setBooks] = useState([])
  const [shelves, setShelves] = useState([])
  const [users, setUsers] = useState([])
  const [notifications, setNotifications] = useState([])
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBookAppUser')))
  const [notifMessage, setNotifMessage] = useState('')
  const [notifClass, setNotifClass] = useState('')
  const [query, setQuery] = useState('')
  const [queryUsers, setQueryUsers] = useState('')
  let navigate = useNavigate()

  useEffect(async () => {
    const initialBooks = await bookService.getAllBooks()
    setBooks(initialBooks)
    const initialUsers = await userService.getAll()
    setUsers(initialUsers)
    const initialShelves = await shelfService.getAllShelves()
    setShelves(initialShelves)
    const initialNotifications = await notificationService.getAllNotifications()
    setNotifications(initialNotifications)
  }, [])
  // useEffect(async () => {
  //   const initialUsers = await userService.getAll()
  //   setUsers(initialUsers)
  // }, [])

  // useEffect(async () => {
  //   const initialShelves = await shelfService.getAllShelves()
  //   setShelves(initialShelves)
  // }, [])

  // useEffect(async () => {
  //   const initialNotifications = await notificationService.getAllNotifications()
  //   setNotifications(initialNotifications)
  // })

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
    navigate('/', { replace: true })
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

  const updateShelf = async (id, shelfObj) => {
    try {
      const newShelf = await shelfService.updateShelf(id, shelfObj)
      setShelves(shelves.map(shelf => shelf.id !== id ? shelf : newShelf))
      setNotifMessage(`shelf ${newShelf.name} updated successfully`)  
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

  const deleteShelf = async id => {
    try {
      const updatedShelves = shelves.filter((v, i) => i !== id)
      setShelves(updatedShelves)
      await shelfService.deleteShelf(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = value => {
    setQuery(value)
    navigate('/results', { replace: true })
  }

  const handleSearchFriends = value => {
    setQueryUsers(value)
    navigate('/resultsusers', { replace: true })
  }

  const borrowBook = id => {
    console.log(id)
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home 
                username={user?.username} 
                handleSignOut={handleSignOut} 
                books={books} 
                shelves={shelves}
                notifications={notifications}
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
                handleSearch={handleSearch}
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
        <Route path='playin' element={<PlayinAround
          user={user}
          handleSignOut={handleSignOut}
          handleSearch={handleSearch}
        />} />
        <Route path='friends' element={<Friends 
          user={user}
          users={users}
          books={books}
          handleSignOut={handleSignOut}
          handleSearch={handleSearch}          
          handleSearchFriends={handleSearchFriends}          
          borrowBook={borrowBook}
          notifications={notifications}
          username={user?.username}
        />} />
        <Route path='/editShelves' element={<Shelves
          user={user}
          handleSignOut={handleSignOut}
          shelves={shelves}
          updateShelf={updateShelf}
          deleteShelf={deleteShelf}
          handleSearch={handleSearch}
          notifShelfClass={notifClass}
          notifShelfMessage={notifMessage}
        />} />
        <Route path='/results' element={<Results
          user={user}
          handleSignOut={handleSignOut}
          query={query}
          handleSearch={handleSearch}
          addBook={addBook}
          notifications={notifications}
          username={user?.username}
          yourBooks={books}
        />} />
        <Route path='/resultsusers' element={<ResultsUsers
          user={user}
          users={users}
          handleSignOut={handleSignOut}
          queryUsers={queryUsers}
          handleSearch={handleSearch}
          notifications={notifications}
          username={user?.username}
        />} />
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
