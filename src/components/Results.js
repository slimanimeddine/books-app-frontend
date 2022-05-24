import FileBase64 from 'react-file-base64'
import React, { useEffect, useState } from 'react'
import {
  Notification,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Button,
  TextInput,
  Menu,
  Avatar,
  Space,
  Center,
  Table,
  ActionIcon,
  Image,
  Group,
  Divider,
  ScrollArea,
  Stack,
  RadioGroup,
  Radio,
  Select,
  Modal,
  Badge,
  Grid,
  Alert,
  Switch,
  Input,
  Box,
  InputWrapper,
  NumberInput,
  Textarea
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle, Check, PlaylistAdd, Friends, Bell, User } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import bookService from '../services/books'


const Results = ({
  user,
  handleSignOut,
  query,
  handleSearch,
  notifications,
  username,
  yourBooks,
  // shelves,
  // addShelf,
  addBook,
  // deleteBook,
  // updateBook,
  // notifShelfClass,
  // notifBookClass,
  // notifUpdateBookClass,
  // notifShelfMessage,
  // notifBookMessage,
  // notifUpdateBookMessage
}) => {
  const userNotifications = notifications.filter(notification => notification.user?.username?.toString() === username)
  const [books, setBooks] = useState([])
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [openedAdd, setOpenedAdd] = useState(Array(books.length).fill(false))
  const [added, setAdded] = useState(Array(books.length).fill(false))
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setSearchQuery(query)
  }, [])

  useEffect(async () => {
      const results = await bookService.searchBooksOnline(searchQuery)
      setBooks(results.items?.map(item => ({
          id: item.id,
          title: item.volumeInfo?.title,
          publisher: item.volumeInfo?.publisher,
          publishedDate: item.volumeInfo?.publishedDate,
          authors: item.volumeInfo?.authors,
          genre: item.volumeInfo?.categories?.[0],
          summary: item.volumeInfo?.description,
          language: item.volumeInfo?.language,
          pageNumber: item.volumeInfo?.pageCount,
          isbn: item.volumeInfo?.industryIdentifiers?.[0].identifier,
          rating: item.volumeInfo?.averageRating,
          image: item.volumeInfo?.imageLinks?.thumbnail
      })))
  }, [searchQuery])

console.log(query)
  const searchForm = useForm({
    initialValues: {
      title: ''
    }
  })

  const rows = books.map(book => (
    <tr key={book.id}>
      <td>
      <Image
        src={book.image}
        height={70}
        width={70}
      />
      </td>
      <td>{book.title}</td>
      <td>{book.authors?.filter(author => author).join(', ')} </td>
      <td>{book.rating}</td>
      <td>{book.publishedDate?.substring(0, 10)}</td>
      <td>
        
        <Modal
          title={<Badge component="a" color='blue' size='lg' variant="outline">
            Add Book
          </Badge>}
        
          opened={openedAdd[books.indexOf(book)]}
          onClose={() => {
            let arr = openedAdd
            let ind = books.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedAdd([...arr])
          }}
          
        >
          <Notification disallowClose  color="blue">
            Do you want to add <strong>{book.title}</strong> to your book list?  
          </Notification>
          <Space h="md" />
          <Center>
            <Button 
              color="blue"
              onClick={() => {
                const bookObj = {
                  book: book.id,
                  details: {
                    title: book.title,
                    authors:book.authors?.map(a => ({
                      authorName: a
                    })),
                    publisher: book.publisher,
                    isbn: book.isbn,
                    format: book.format,
                    genre: book.genre,
                    publishedDate: book.publishedDate,
                    pageNumber: book.pageNumber,
                    language: book.language,
                    price: book.price,
                    series: book.series,
                    vol: book.vol,
                    quantity: book.quantity,
                    rating: book.rating,
                    summary: book.summary,
                    image: book.image
                  },
                  note: {
                    pageRead: 0,
                    favorite: false,
                    dateAdded: new Date(),
                    comments: ''
                  },
                  shelf: undefined
                }
                addBook(bookObj)
                let ind = books.indexOf(book)
                let arr = openedAdd
                let arr0 = added
                if (~arr0) {
                  arr0[ind] = true
                }
                setAdded([...arr0])
                if (~arr) {
                  arr[ind] = false;
                }
                setOpenedAdd([...arr])
                arr = arr.filter((a, i) => i !== ind)
                setOpenedAdd([...arr])
              }}
            >
              Add book
            </Button>
          </Center>
        </Modal>
        {
          !added[books.indexOf(book)]
          ? <ActionIcon variant="hover" component={Button} onClick={() => {
              let arr = openedAdd
              let ind = books.indexOf(book)
              if (~arr) {
                arr[ind] = true;
              }
              setOpenedAdd([...arr])
            }}><PlaylistAdd size={16} /></ActionIcon>
          : <Check size={16} />
        }
        
      </td>
    </tr>
  ))

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text weight={500}>&copy; Booksgenix 2022 Inc</Text>
          </Center>
        </Footer>
      }
      header={
        <Header height={100} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Link to='/'><Title order={1}>Booksgenix</Title></Link>
          
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <form onSubmit={searchForm.onSubmit((values) => {
            handleSearch(values.title.split(' ').join('+'))
          })}>
            <Group>
              <TextInput 
                style={{ width: 670 }} 
                placeholder="search and add books" 
                icon={<Search size={14} />} 
                {...searchForm.getInputProps('title')}
              />
              <Button type="submit">Search</Button>
            </Group>
          </form>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Menu size={300} control={<Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl">
            <Bell size={24} />
          </Avatar>
          }>
            <Menu.Label>Notifications</Menu.Label>
              <Menu.Item className="item">
                <Stack>
                  {
                    userNotifications.length > 0
                    ? userNotifications.map(notif => (
                      <Group>
                        <Avatar color="cyan" radius="xl">
                          <User size={24} />
                        </Avatar>
                        <div>
                          <Text size="sm">{notif.content?.toString()}</Text>
                          <Text size="xs" color="dimmed">{notif.dateSent?.toString()}</Text>
                        </div>
                      </Group>
                    ))
                    : <div>
                        <Text size="sm">you have no notifications</Text>
                      </div>
                  }
                </Stack>
              </Menu.Item>
          </Menu>
          <Space w="lg" />
          <Space w="lg" />
          <Avatar component={Link} to="/friends" style={{ cursor: "pointer" }} color="cyan" radius="xl">
            <Friends size={24} />
          </Avatar>
          <Space w="lg" />
          <Space w="lg" />
          <Menu control={<Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl">{user.username.substring(0,2)}</Avatar>}>
            <Menu.Label>{user.username}</Menu.Label>
            <Menu.Item 
              color="red" 
              icon={<Logout size={14} />} 
              onClick={handleSignOut}
            >
                sign out
            </Menu.Item>
          </Menu>
          </div>
        </Header>
      }
    >
      <Table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Rating</th>
            <th>Date Published</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </AppShell>
  )
}

export default Results