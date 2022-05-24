import React, { useState, useEffect } from 'react'
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
  Textarea,
  Indicator
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle, Check, Bell, User, Friends, Books } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import userService from '../services/users'


const SelectItem = ({ image, title, genre, ...others }) => (
  <div {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text size="sm">{title}</Text>
        <Text size="xs" color="dimmed">
            {genre}
          </Text>
      </div>
    </Group>
  </div>
)


const FriendsList = ({
  handleSignOut,
  user,
  username,
  handleSearch,
  handleSearchFriends,
  users,
  books,
  borrowBook,
  notifications
}) => {
    
  const sortForm = useForm({
    initialValues: {
      ascDesc: '',
      criterion: ''
    }
  })

  const searchForm = useForm({
      initialValues: {
          title: ''
      }
  })

  const searchFriends = useForm({
      initialValues: {
          searchTerms: ''
      }
  })

  const targetedUser = users.find(user => user.username === username)
  const userNotifications = notifications.filter(notification => notification.user?.username?.toString() === username)
  const userBooks = []
  const userFriends = targetedUser?.friends
  const userRequestSent = targetedUser?.requestSent
  const userRequestReceived = targetedUser?.requestReceived
  const userAskToBorrow = targetedUser?.askToBorrow
  const pendingToLend = targetedUser?.pendingToLend
  userFriends?.forEach(u => {
    let tempBooks = books.filter(b => b.user.id.toString() === u)
    tempBooks.forEach(b => {
      userBooks.push(b)
    })
  })

  const [booksList, setBooksList] = useState([])
  const [openedDetails, setOpenedDetails] = useState(Array(userBooks.length).fill(false))
  const [openedBorrow, setOpenedBorrow] = useState(Array(userBooks.length).fill(false))

  useEffect(() => {
    setBooksList(userBooks)
  }, [])

  const data = booksList.map(book => ({
    image: book.details.image,
    title: book.details.title,
    genre: book.details.genre
  }))


  const rows = booksList.map(book => (
    <tr key={book.id}>
      <td>
      <Image
        src={book.details.image}
        height={70}
        width={70}
      />
      </td>
      <td>{book.details.title}</td>
      <td>{book.details.authors ? book.details.authors.filter(author => author).map(author => author.authorName).join(', ') : "not set"} </td>
      <td>{book.details.rating ? book.details.rating : "not set"}</td>
      <td>{book.shelf ? book.shelf.name : "not set"}</td>
      <td>{book.note.dateAdded ? book.note.dateAdded.substring(0, 10) : "not set"}</td>
      <td>
      <Modal
          title={<Badge component="a" color='blue' size='lg' variant="outline">
            Borrow Book
          </Badge>}
        
          opened={openedBorrow[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedBorrow
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedBorrow([...arr])
          }}
          
        >
          <Text>Do you want to borrow <strong>{book.details.title}</strong>?</Text>
          <Space h="md" />
          <Center>
            <Button 
              color="blue"
              onClick={() => {
                borrowBook(book.id)
                let arr = openedBorrow
                let ind = userBooks.indexOf(book)
                if (~arr) {
                  arr[ind] = false;
                }
                setOpenedBorrow([...arr])
                arr = arr.filter((a, i) => i !== ind)
              }}
            >
              Borrow book
            </Button>
          </Center>
        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedBorrow
          let ind = userBooks.indexOf(book)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedBorrow([...arr])
        }}><Books size={16} /></ActionIcon>

        
        <Modal
          title={<Badge component="a" size='lg' variant="outline">
            Book details
          </Badge>}
          opened={openedDetails[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedDetails
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedDetails([...arr])
          }}
        >
          <Grid>
            <Grid.Col span={4}>
              <Image 
                src={book.details.image}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text weight={700}>{book.details.title}</Text>
              <Text size="md">by {book.details.authors ? book.details.authors.filter(author => author).map(author => author.authorName).join(', ') : "not set"}</Text>
            </Grid.Col>
            <Stack>
              <Text style={{ marginLeft: 10 }} size="md"><strong>publisher: </strong>{book.details.publisher ? book.details.publisher : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>isbn: </strong>{book.details.isbn ? book.details.isbn : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>format: </strong>{book.details.format ? book.details.format : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>genre: </strong>{book.details.genre ? book.details.genre : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>published date: </strong>{book.details.publishedDate ? book.details.publishedDate.substring(0,10) : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages number: </strong>{book.details.pageNumber ? book.details.pageNumber : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>language: </strong>{book.details.language ? book.details.language : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>price: </strong>{book.details.price ? book.details.price : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>series: </strong>{book.details.series ? book.details.series : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>volume: </strong>{book.details.vol ? book.details.vol : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>quantity: </strong>{book.details.quantity ? book.details.quantity : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>rating: </strong>{book.details.rating ? book.details.rating : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>summary: </strong>{book.details.summary ? book.details.summary : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>shelf: </strong>{book.shelf ? book.shelf.name : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages read: </strong>{book.note.pageRead ? book.note.pageRead : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>date added: </strong>{book.note.dateAdded ? book.note.dateAdded.substring(0,10) : "not set"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>comments: </strong>{book.note.comments ? book.note.comments : "not set"}</Text>
            </Stack>
          </Grid>
        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedDetails
          let ind = userBooks.indexOf(book)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedDetails([...arr])
        }}><ListDetails size={16} /></ActionIcon>
      </td>
    </tr>
  ))
    
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

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
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <ScrollArea>
            <Stack>
              <Group>
                <Text weight={500}>Friends</Text>
                {/* <Text variant="link" component={Link} to="/editFriends">(Edit)</Text> */}
              </Group>
              <Text
                  className='btn'
                  component='button'
                  variant="link"
                  onClick={() => {
                    setBooksList([...userBooks])
                  }}
                >
                  all ({userBooks.length})
                </Text>

              <Divider my="xs" label="Friends" labelPosition="center" />
              {userFriends?.length > 0
              ? userFriends.map(user => (
                <Text
                  className='btn'
                  component='button'
                  variant="link"
                  key={user}
                  onClick={() => {
                    setBooksList([...userBooks.filter(b => b.user.id === user)])
                  }}
                >
                  {users.find(u => u.id === user) ?  `${users.find(u => u.id === user).username} (${users.find(u => u.id === user).books?.length})` : ""}
                </Text>
              ))
              : <Text>You have no friends</Text>

            }
            <form onSubmit={searchFriends.onSubmit((values) => {
              handleSearchFriends(values.searchTerms)
            })}>
            <Stack>
              <TextInput 
                style={{ width: 267 }} 
                placeholder="search and add friends" 
                icon={<Search size={14} />} 
                {...searchFriends.getInputProps('searchTerms')}
              />
              <Button type="submit">Search</Button>
            </Stack>
          </form>
          <Divider my="xs" label="Friendship Requests Sent" labelPosition="center" />
          {userRequestSent?.length > 0
              ? userRequestSent.map(user => (
                <Stack key={user}>
                  
                    <Group>
                    <strong>{users.find(u => u.id === user).username}</strong>
                      <Button 
                        compact
                        color="red"
                        onClick={async () => {
                          await userService.updateUser(targetedUser.id, {
                            requestSent: targetedUser?.requestSent?.filter(rq => rq != user)
                          })
                          await userService.updateUser(user, {
                            requestReceived: users?.find(u => u?.id === user).requestReceived?.filter(rq => rq != targetedUser?.id),
                          })            
                        }}
                      >
                        cancel
                      </Button>
                  </Group>
                </Stack>
              ))
              : <Text>You haven't sent any friendship requests.</Text>
            }
          <Divider my="xs" label="Friendship Requests Received" labelPosition="center" />
          {userRequestReceived?.length > 0
              ? userRequestReceived.map(user => (
                <Stack key={user}>
                    <Group>
                    {users.find(u => u.id === user).username}

                      <Button 
                        compact
                        color="blue"
                        // onClick={async () => {
                        //   await userService.updateUser(targetedUser.id, {
                        //     requestSent: targetedUser.requestSent?.filter(rq => rq != user)
                        //   })
                        //   await userService.updateUser(user, {
                        //     requestReceived: users.find(u => u.id === user).requestReceived?.filter(rq => rq != targetedUser.id),
                        //   })            
                        // }}
                      >
                        accept
                      </Button>
                      <Button 
                        color="red"
                        // onClick={async () => {
                        //   await userService.updateUser(targetedUser.id, {
                        //     requestSent: targetedUser.requestSent?.filter(rq => rq != user)
                        //   })
                        //   await userService.updateUser(user, {
                        //     requestReceived: users.find(u => u.id === user).requestReceived?.filter(rq => rq != targetedUser.id),
                        //   })            
                        // }}
                      >
                        reject
                      </Button>
                    </Group>
                </Stack>
              ))
              : <Text>You haven't Received any friendship requests.</Text>
            }
          <Divider my="xs" label="Books You Want To Borrow" labelPosition="center" />
          {userAskToBorrow?.length > 0
              ? userAskToBorrow.map(book => (
                <Stack key={book.id}>
                  <Group>
                    you want to borrow {book.details?.title} from {book.user?.username}
                    <Group>
                      <Button 
                        color="red"
                        // onClick={async () => {
                        //   await userService.updateUser(targetedUser.id, {
                        //     requestSent: targetedUser.requestSent?.filter(rq => rq != user)
                        //   })
                        //   await userService.updateUser(user, {
                        //     requestReceived: users.find(u => u.id === user).requestReceived?.filter(rq => rq != targetedUser.id),
                        //   })            
                        // }}
                      >
                        cancel
                      </Button>
                    </Group>
                  </Group>
                </Stack>
              ))
              : <Text>You haven't asked to borrow any book.</Text>
            }
          <Divider my="xs" label="Books Pending To Lend" labelPosition="center" />
          {pendingToLend?.length > 0
              ? pendingToLend.map(b => (
                <Stack key={b.id}>
                  <Group>
                    {b.user?.username} wants to borrow {b.book?.title} from you
                    <Group>
                      <Button 
                        color="blue"
                        // onClick={async () => {
                        //   await userService.updateUser(targetedUser.id, {
                        //     requestSent: targetedUser.requestSent?.filter(rq => rq != user)
                        //   })
                        //   await userService.updateUser(user, {
                        //     requestReceived: users.find(u => u.id === user).requestReceived?.filter(rq => rq != targetedUser.id),
                        //   })            
                        // }}
                      >
                        lend
                      </Button>
                      <Button 
                        color="red"
                        // onClick={async () => {
                        //   await userService.updateUser(targetedUser.id, {
                        //     requestSent: targetedUser.requestSent?.filter(rq => rq != user)
                        //   })
                        //   await userService.updateUser(user, {
                        //     requestReceived: users.find(u => u.id === user).requestReceived?.filter(rq => rq != targetedUser.id),
                        //   })            
                        // }}
                      >
                        decline
                      </Button>
                    </Group>
                  </Group>
                </Stack>
              ))
              : <Text>You haven't received any borrow requests.</Text>
            }
          
            </Stack>
          </ScrollArea>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Divider my="xs" label="Sort your books" labelPosition="center" />
          <form onSubmit={sortForm.onSubmit(values => {
            let sortedBooksList = booksList
            if (values.criterion === 'title') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.title.localeCompare(b.details.title) ))
              else if (values.ascDesc === 'desc') 
                setBooksList(sortedBooksList.sort((a,b) => b.details.title.localeCompare(a.details.title) ))
            } else if (values.criterion === 'authors') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.authors.map(a => a.authorName).join(', ').localeCompare(b.details.authors.map(a => a.authorName).join(', ')) ))
              else if (values.ascDesc === 'desc') 
                setBooksList(sortedBooksList.sort((a,b) => b.details.authors.map(a => a.authorName).join(', ').localeCompare(a.details.authors.map(a => a.authorName).join(', ')) ))
            } else if (values.criterion === 'publisher') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.publisher.localeCompare(b.details.publisher) ))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.publisher.localeCompare(a.details.publisher) ))
            } else if (values.criterion === 'isbn') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.isbn.localeCompare(b.details.isbn) ))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.isbn.localeCompare(a.details.isbn) ))
            } else if (values.criterion === 'format') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.format.localeCompare(b.details.format) ))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.format.localeCompare(a.details.format) ))
            } else if (values.criterion === 'genre') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.genre.localeCompare(b.details.genre) ))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.genre.localeCompare(a.details.genre) ))
            } else if (values.criterion === 'publishedDate') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.publishedDate > b.details.publishedDate))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.publishedDate > a.details.publishedDate))
            } else if (values.criterion === 'pageNumber') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.pageNumber - b.details.pageNumber))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.pageNumber - a.details.pageNumber))
            } else if (values.criterion === 'language') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.language.localeCompare(b.details.language) ))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.language.localeCompare(a.details.language) ))
            } else if (values.criterion === 'price') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.price - b.details.price))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.price - a.details.price))
            } else if (values.criterion === 'rating') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.details.rating - b.details.rating))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.details.rating - a.details.rating))
            } else if (values.criterion === 'pageRead') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.note.pageRead - b.note.pageRead))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.note.pageRead - a.note.pageRead))
            } else if (values.criterion === 'dateAdded') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.note.dateAdded > b.note.dateAdded))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.note.dateAdded > a.note.dateAdded))
            } else if (values.criterion === 'favorite') {
              if (values.ascDesc === 'asc')
                setBooksList(sortedBooksList.sort((a,b) => a.note.favorite > b.note.favorite))
              else if (values.ascDesc === 'desc')
                setBooksList(sortedBooksList.sort((a,b) => b.note.favorite > a.note.favorite))
            }
          })}>
            <RadioGroup 
              label="Select sorting criterion"
              {...sortForm.getInputProps('ascDesc')}
            >
              <Radio value="asc" label="asc" />
              <Radio value="desc" label="desc" />
            </RadioGroup>
            <Space h="md" />
            <Select
              allowDeselect
              maxDropdownHeight={280}
              placeholder="Choose criteria"
              {...sortForm.getInputProps('criterion')}

              data={[
                { value: 'title', label: 'title' },
                { value: 'authors', label: 'authors' },
                { value: 'publisher', label: 'publisher' },
                { value: 'isbn', label: 'isbn' },
                { value: 'format', label: 'format' },
                { value: 'genre', label: 'genre' },
                { value: 'publishedDate', label: 'published date' },
                { value: 'pageNumber', label: 'pages number' },
                { value: 'language', label: 'language' },
                { value: 'price', label: 'price' },
                { value: 'rating', label: 'rating' },
                { value: 'pageRead', label: 'pages read' },
                { value: 'dateAdded', label: 'date added' },
                { value: 'favorite', label: 'favorite' },
              ]}
            />
            <Center>
              <Group position="right" mt="md">
                <Button type="submit">sort</Button>
              </Group>
            </Center>
          </form>
            <Space h="md" />
            <Divider my="xs" label="Search among your books" labelPosition="center" />
            <Select
              label="Enter title"
              placeholder="Search book"
              itemComponent={SelectItem}
              data={data}
              searchable
              maxDropdownHeight={400}
              nothingFound="nothing is in here"
              filter={(value, item) =>
                item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.genre.toLowerCase().includes(value.toLowerCase().trim())
              }
            />

          </Aside>
        </MediaQuery>
      }
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
          <Menu size={300} control={
            <Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl">
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
            <th>Shelf</th>
            <th>Date added</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

    </AppShell>
  )
}

export default FriendsList