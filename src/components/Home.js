import React, { useState } from 'react'
import {
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
  Accordion,
  Grid,
  Alert
} from '@mantine/core'
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle } from 'tabler-icons-react'
import { Link } from 'react-router-dom'

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


const Home = ({ username, handleSignOut, books, shelves}) => {
  const userBooks = books.filter(book => book.user.username.toString() === username)
  const userShelves = shelves.filter(shelf => shelf.user.username.toString() === username)

  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [openedEdit, setOpenedEdit] = useState(Array(userBooks.length).fill(false))
  const [openedRemove, setOpenedRemove] = useState(Array(userBooks.length).fill(false))
  const [openedDetails, setOpenedDetails] = useState(Array(userBooks.length).fill(false))

  const data = userBooks.map(book => ({
    image: book.details.image,
    title: book.details.title,
    genre: book.details.genre
  }))

  const rows = userBooks.map(book => (
    <tr key={book.id}>
      <td>
      <Image
        src={book.details.image}
        height={70}
        width={70}
      />
      </td>
      <td>{book.details.title}</td>
      <td>{book.details.authors.map(author => author.authorName).join(', ')}</td>
      <td>{book.details.rating}</td>
      <td>{book.shelf.name}</td>
      <td>{book.note.dateAdded.substring(0, 10)}</td>
      <td>
        <Modal
          opened={openedEdit[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedEdit
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedEdit([...arr])
          }}
          title="edit book"
          key={book.id}
        >
          {/* modal content */}
        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedEdit
          let ind = userBooks.indexOf(book)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedEdit([...arr])
          
        }}><Edit size={16} /></ActionIcon>
        {/* ========================= */}
        <Modal
          opened={openedRemove[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedRemove
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedRemove([...arr])
          }}
          key={book.id}
        >
          <Alert icon={<AlertCircle size={16} />}  color="red">
            Are you sure you want to delete <strong>{book.details.title}</strong> from your books?  
          </Alert>
          <Space h="md" />
          <Center>
          <Button color="red">
            delete book
          </Button>
          </Center>
        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedRemove
          let ind = userBooks.indexOf(book)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedRemove([...arr])
        }}><X size={16} /></ActionIcon>
        {/* ========================= */}
        <Modal
          opened={openedDetails[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedDetails
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedDetails([...arr])
          }}
          key={book.id}

        >
          {/* Modal content */}
          <Grid>
            <Grid.Col span={4}>
              <Image 
                src={book.details.image}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text weight={700}>{book.details.title}</Text>
              <Text size="md">by {book.details.authors.map(author => author.authorName).join(', ')}</Text>
            </Grid.Col>
            <Stack>
              <Text style={{ marginLeft: 10 }} size="md"><strong>publisher: </strong>{book.details.publisher}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>isbn: </strong>{book.details.isbn}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>format: </strong>{book.details.format}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>genre: </strong>{book.details.genre}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>published date: </strong>{book.details.publishedDate.substring(0,10)}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages number: </strong>{book.details.pageNumber}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>language: </strong>{book.details.language}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>price: </strong>{book.details.price}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>series: </strong>{book.details.series}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>volume: </strong>{book.details.vol}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>quantity: </strong>{book.details.quantity}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>rating: </strong>{book.details.rating}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>summary: </strong>{book.details.summary}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>shelf: </strong>{book.shelf.name}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages read: </strong>{book.note.pageRead}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>date added: </strong>{book.note.dateAdded.substring(0,10)}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>comments: </strong>{book.note.comments}</Text>
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
      // navbar
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <ScrollArea >
            <Stack>
              <Group>
                <Text weight={500}>Bookshelves</Text>
                <Text variant="link" component={Link} to="/somewhere">(Edit)</Text>
              </Group>
              <Text variant="link" component={Link} to="/somewhere">All ({userBooks.length})</Text>
              <Divider my="xs" label="Shelves" labelPosition="center" />
              {userShelves.map(shelf => (
                <Text key={shelf.id} variant="link" component={Link} to="/somewhere">{shelf.name} ({userBooks.map(b => b.shelf.name === shelf.name).length})</Text>  
              ))}
              <Space h="md" />
              <Button variant="outline">add shelf</Button>
              <Divider my="xs" label="Books" labelPosition="center" />
              <Button variant="outline">add book manually</Button>
              <Divider my="xs" label="Statistics" labelPosition="center" />
              <Text variant="link" component={Link} to="/somewhere">Reading activity</Text>
              <Text variant="link" component={Link} to="/somewhere">Books statistics</Text>
              <Text variant="link" component={Link} to="/somewhere">Shelves statistics</Text>
              <Divider my="xs" />
              <Button color="red">
                Delete library
              </Button>
            </Stack>
          </ScrollArea>
        </Navbar>
      }
      // aside
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Divider my="xs" label="sort your books" labelPosition="center" />
            <RadioGroup label="select sorting criterias">
              <Radio value="asc" label="asc" />
              <Radio value="desc" label="desc" />
            </RadioGroup>
            <Space h="md" />
            <Select
            allowDeselect
              maxDropdownHeight={280}
              placeholder="choose criteria"
              data={[
                { value: 'author', label: 'author' },
                { value: 'title', label: 'title' },
                { value: 'publisher', label: 'publisher' },
                { value: 'genre', label: 'genre' },
                { value: 'publishedDate', label: 'published date' },
                { value: 'pageNumber', label: 'pages number' },
                { value: 'language', label: 'language' },
                { value: 'price', label: 'price' },
                { value: 'rating', label: 'rating' },
                { value: 'pageRead', label: 'pages read' },
                { value: 'isbn', label: 'isbn' },
                { value: 'dateAdded', label: 'date added' },
              ]}
            />
            <Space h="md" />
            <Divider my="xs" label="search among your books" labelPosition="center" />
            <Select
              label="enter title"
              placeholder="search book"
              itemComponent={SelectItem}
              data={data}
              searchable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.genre.toLowerCase().includes(value.toLowerCase().trim())
              }
            />
          </Aside>
        </MediaQuery>
      }
      // footer
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text weight={500}>&copy; Booksgenix 2022 Inc</Text>
          </Center>
        </Footer>
      }
      // header
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
          <Title order={1}>Booksgenix</Title>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <TextInput style={{ width: 670 }} placeholder="search and add books" icon={<Search size={14} />} />
          <Space w="xs" />
          <Button>
            search
          </Button>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Menu control={<Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl">{username.substring(0,2)}</Avatar>}>
            <Menu.Label>{username}</Menu.Label>
            {/* <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item> */}
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
      {/* body */}
      <Table>
        <thead>
          <tr>
            <th>cover</th>
            <th>title</th>
            <th>author</th>
            <th>rating</th>
            <th>shelf</th>
            <th>dateAdded</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </AppShell>
  )
}

export default Home