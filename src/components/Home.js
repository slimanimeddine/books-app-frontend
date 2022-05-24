import FileBase64 from 'react-file-base64'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle, Check, Friends, Bell, User } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useForm } from '@mantine/form';


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

const Home = ({
  username,
  handleSignOut,
  books,
  shelves,
  notifications,
  addShelf,
  addBook,
  deleteBook,
  updateBook,
  notifShelfClass,
  notifBookClass,
  notifUpdateBookClass,
  notifShelfMessage,
  notifBookMessage,
  notifUpdateBookMessage,
  handleSearch
}) => {
  const userBooks = books.filter(book => book.user?.username?.toString() === username)
  const userShelves = shelves.filter(shelf => shelf.user?.username?.toString() === username)
  const userNotifications = notifications.filter(notification => notification.user?.username?.toString() === username)
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [openedEdit, setOpenedEdit] = useState(Array(userBooks.length).fill(false))
  const [openedRemove, setOpenedRemove] = useState(Array(userBooks.length).fill(false))
  const [openedDetails, setOpenedDetails] = useState(Array(userBooks.length).fill(false))
  const [openedAddBook, setOpenedAddBook] = useState(false)
  const [openedAddShelf, setOpenedAddShelf] = useState(false)
  const [booksList, setBooksList] = useState([])
  useEffect(() => {
    setBooksList(userBooks)
  }, [])

  const form = useForm({
    initialValues: {
      title: '',
      authors: '',
      publisher: '',
      isbn: '',
      format: '',
      genre: '',
      publishedDate: '',
      pageNumber: '',
      language: '',
      price: '',
      series: '',
      vol: '',
      quantity: '',
      rating: '',
      summary: '',
      image: '',
      pageRead: '',
      favorite: '',
      dateAdded: '',
      comments: '',
      shelf: '',
    },
  })

  const shelfForm = useForm({
    initialValues: {
      name: ''
    }
  })

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

  const data = booksList.map(book => ({
    image: book.details?.image,
    title: book.details?.title,
    genre: book.details?.genre
  }))

  const rows = booksList.map(book => (
    <tr key={book.id}>
      <td>
      <Image
        src={book.details?.image}
        height={70}
        width={70}
      />
      </td>
      <td>{book.details?.title}</td>
      <td>{book.details?.authors?.filter(author => author).map(author => author?.authorName).join(', ')} </td>
      <td>{book.details?.rating}</td>
      <td>{book.shelf?.name}</td>
      <td>{book.note?.dateAdded?.substring(0, 10)}</td>
      <td>
        <Modal
          size='70%'
          title={<Badge component="a" size='lg' variant="outline">
            Edit Book
          </Badge>}
        
          opened={openedEdit[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedEdit
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedEdit([...arr])
            let formObj = form
            formObj = {
              ...formObj,
              title: '',
              authors: '',
              publisher: '',
              isbn: '',
              format: '',
              genre: '',
              publishedDate: '',
              pageNumber: '',
              language: '',
              price: '',
              series: '',
              vol: '',
              quantity: '',
              rating: '',
              summary: '',
              image: '',
              pageRead: '',
              favorite: '',
              dateAdded: '',
              comments: '',
              shelf: '',        
            }
            form.setValues({...formObj})
          }}
          
        >
        <Box mx="auto">
          <form onSubmit={event => {
            event.preventDefault()
            let bookObj = {
              details: {
                title: form.values.title,
                authors: form.values.authors.split(', ').map(a => ({
                  authorName: a
                })),
                publisher: form.values.publisher,
                isbn: form.values.isbn,
                format: form.values.format,
                genre: form.values.genre,
                publishedDate: form.values.publishedDate,
                pageNumber: form.values.pageNumber,
                language: form.values.language,
                price: form.values.price,
                series: form.values.series,
                vol: form.values.vol,
                quantity: form.values.quantity,
                rating: form.values.rating,
                summary: form.values.summary,
                image: form.values.image
              },
              note: {
                pageRead: form.values.pageRead,
                favorite: form.values.favorite,
                dateAdded: form.values.dateAdded,
                comments: form.values.comments 
              },
              shelf: form.values.shelf
            }
            updateBook(book.id, bookObj)
          }}>
            <Divider my="xs" label="Book details" labelPosition="center" />
            <InputWrapper
              label="Title"
              description="What's the title of your book?"        
            >
              <TextInput
                {...form.getInputProps('title')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Authors"
              description="Who are the authors of your book?, seperate the names by commas."        
            >
              <TextInput
                {...form.getInputProps('authors')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Publisher"
              description="Who published your book?"        
            >
              <TextInput
                {...form.getInputProps('publisher')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="ISBN"
              description="What's the ISBN 10 or 13 number of your book?"        
            >
              <TextInput
                {...form.getInputProps('isbn')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Format"
              description="What's the format of your book?"        
            >
              <Select
                {...form.getInputProps('format')}
                data={[
                  { value: 'Hardcover', label: 'Hardcover' },
                  { value: 'Paperback', label: 'Paperback' },
                  { value: 'Mass-Market Paperback', label: 'Mass-Market Paperback' },
                  { value: 'Library Binding', label: 'Library Binding' },
                  { value: 'Spiral Binding', label: 'Spiral Binding' },                ]}
              /> 
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Genre"
              description="What's the genre of your book?"        
            >
              <Select
              {...form.getInputProps('genre')}
                data={[
                  { value: 'Arts & Photography', label: 'Arts & Photography' },
                  { value: 'Biographies & Memoirs', label: 'Biographies & Memoirs' },
                  { value: 'Business & Money', label: 'Business & Money' },
                  { value: 'Calendars', label: 'Calendars' },
                  { value: "Children's Books", label: "Children's Books" },
                  { value: 'Comics & Graphic Novels', label: "Comics & Graphic Novels" },
                  { value: 'Computers & Technology', label: "Computers & Technology" },
                  { value: 'Cookbooks, Food & Wine', label: "Cookbooks, Food & Wine" },
                  { value: 'Crafts, Hobbies & Home', label: "Crafts, Hobbies & Home" },
                  { value: 'Christian Books & Bibles', label: "Christian Books & Bibles" },
                  { value: 'Engineering & Transportation', label: "Engineering & Transportation" },
                  { value: 'Health, Fitness & Dieting', label: "Health, Fitness & Dieting" },
                  { value: 'History', label: "History" },
                  { value: 'Humor & Entertainment', label: "Humor & Entertainment" },
                  { value: 'Law', label: "Law" },
                  { value: 'Literature & Fiction', label: "Literature & Fiction" },
                  { value: 'Medical Books', label: "Medical Books" },
                  { value: 'Mystery, Thriller & Suspense', label: "Mystery, Thriller & Suspense" },
                  { value: 'Parenting & Relationships', label: "Parenting & Relationships" },
                  { value: 'Politics & Social Sciences', label: "Politics & Social Sciences" },
                  { value: 'Reference', label: "Reference" },
                  { value: 'Religion & Spirituality', label: "Religion & Spirituality" },
                  { value: 'Romance', label: "Romance" },
                  { value: 'Science & Math', label: "Science & Math" },
                  { value: 'Science Fiction & Fantasy', label: "Science Fiction & Fantasy" },
                  { value: 'Self-Help', label: "Self-Help" },
                  { value: 'Sports & Outdoors', label: "Sports & Outdoors" },
                  { value: 'Teen & Young Adult', label: "Teen & Young Adult" },
                  { value: 'Test Preparation', label: "Test Preparation" },
                  { value: 'Travel', label: "Travel" },
                  { value: 'Education & Teaching', label: "Education & Teaching" },
                  { value: 'Other', label: "Other" },
          ]}
              /> 
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Date published"
              description="When was your book published?"        
            >
              <DatePicker  
                {...form.getInputProps('publishedDate')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Number of pages"
              description="How many pages your book contain?"        
            >
              <NumberInput
                {...form.getInputProps('pageNumber')}
                min={10}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Language"
              description="In which language your book is written?"        
            >
              <Select
                {...form.getInputProps('language')}
                data={[
                  { value: 'English', label: 'English' },
                  { value: 'French', label: 'French' },
                  { value: 'German', label: 'German' },
                  { value: 'Italian', label: 'Italian' },
                  { value: 'Japenese', label: 'Japenese' },
                ]}
              /> 
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Price"
              description="What's the price of your book?"        
            >
              <NumberInput
                {...form.getInputProps('price')}
                defaultValue={1000}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '$ '
                }
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Series"
              description="To which series this book belongs?"        
            >
              <TextInput
                {...form.getInputProps('series')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Volume"
              description="What volume is this book?"        
            >
              <NumberInput
                min={0}
                {...form.getInputProps('vol')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Quantity"
              description="Indicate the quantity of your book?"        
            >
              <NumberInput
                min={0}
                {...form.getInputProps('quantity')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Rating"
              description="What's the rating of your book?"        
            >
              <NumberInput
                {...form.getInputProps('rating')}
                precision={2}
                min={0}
                step={0.05}
                max={5}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Summary"
              description="What's your book about?"        
            >
              <Textarea
                {...form.getInputProps('summary')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Cover"
              description="Insert a cover image for your book."        
            >
              <FileBase64
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple={false}
                onDone={({ base64 }) => form.setFieldValue('image', base64)}
              />

            </InputWrapper>

            <Divider my="xs" label="Book note" labelPosition="center" />
            <Space h="md" />
            <InputWrapper
              label="Number of pages read"
              description="How many pages have you read from your book?"        
            >
              <NumberInput
                min={0}
                {...form.getInputProps('pageRead')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Favorite"
              description="Is this book one of your favorites?"        
            >
              <Switch onLabel="Yes" offLabel="No" size='xl'
                checked={form.values.favorite}
                onChange={(event) => {
                form.setFieldValue("favorite", event.currentTarget.checked)}}  
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Date added"
              description="When did you add this book to your library?"        
            >
              <DatePicker  
                {...form.getInputProps('dateAdded')}
              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Comments"
              description="Do you have any comments about your book?"        
            >
              <Textarea
                {...form.getInputProps('comments')}
              />
            </InputWrapper>
            <Divider my="xs" label="Book shelf" labelPosition="center" />
            <Space h="md" />
            <InputWrapper
              label="Shelf"
              description="In which shelf you want to put your book?"        
            >
              <Select
                {...form.getInputProps('shelf')}
                data={
                  userShelves.map(shelf => ({
                    value: shelf.id,
                    label: shelf.name
                  }))
                }
              /> 
            </InputWrapper>

            <Space h="md" />

            <Center>
            {notifUpdateBookClass === 'error'
              ? <Notification disallowClose icon={<X size={18} />} color="red">
                  {notifUpdateBookMessage}
                </Notification>            
              : notifUpdateBookClass === 'success' 
              ? <Notification disallowClose icon={<Check size={18} />} color="teal">
                  {notifUpdateBookMessage}
                </Notification>
              : null
            }
            </Center>


            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>

        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedEdit
          let ind = userBooks.indexOf(book)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedEdit([...arr])
          let formObj = form
          formObj = {
            ...formObj,
            title: book.details?.title,
            authors: book.details?.authors?.filter(a => a).map(author => author?.authorName).join(', '),
            publisher: book.details?.publisher,
            isbn: book.details?.isbn,
            format: book.details?.format,
            genre: book.details?.genre,
            publishedDate: book.details?.publishedDate,
            pageNumber: book.details?.pageNumber,
            language: book.details?.language,
            price: book.details?.price,
            series: book.details?.series,
            vol: book.details?.vol,
            quantity: book.details?.quantity,
            rating: book.details?.rating,
            summary: book.details?.summary,
            image: book.details?.image,
            pageRead: book.note?.pageRead,
            favorite: book.note?.favorite,
            dateAdded: book.note?.dateAdded,
            comments: book.note?.comments,
            shelf: book.shelf?.id
          }
          form.setValues({...formObj})
        }}><Edit size={16} /></ActionIcon>
        <Modal
          title={<Badge component="a" color='red' size='lg' variant="outline">
            Remove Book
          </Badge>}
        
          opened={openedRemove[userBooks.indexOf(book)]}
          onClose={() => {
            let arr = openedRemove
            let ind = userBooks.indexOf(book)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedRemove([...arr])
          }}
        >
          <Alert icon={<AlertCircle size={16} />}  color="red">
            Are you sure you want to delete <strong>{book.details?.title}</strong> from your books?  
          </Alert>
          <Space h="md" />
          <Center>
            <Button 
              color="red"
              onClick={() => {
                deleteBook(book.id)
                let arr = openedRemove
                let ind = userBooks.indexOf(book)
                if (~arr) {
                  arr[ind] = false;
                }
                setOpenedRemove([...arr])
                arr = arr.filter((a, i) => i !== ind)
              }}
            >
              Delete book
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
                src={book.details?.image}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text weight={700}>{book.details?.title}</Text>
              <Text size="md">by {book.details?.authors?.filter(author => author).map(author => author?.authorName).join(', ')}</Text>
            </Grid.Col>
            <Stack>
              <Text style={{ marginLeft: 10 }} size="md"><strong>publisher: </strong>{book.details?.publisher}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>isbn: </strong>{book.details?.isbn}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>format: </strong>{book.details?.format}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>genre: </strong>{book.details?.genre}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>published date: </strong>{book.details?.publishedDate?.substring(0,10)}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages number: </strong>{book.details?.pageNumber}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>language: </strong>{book.details?.language}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>price: </strong>{book.details?.price}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>series: </strong>{book.details?.series}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>volume: </strong>{book.details?.vol}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>quantity: </strong>{book.details?.quantity}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>rating: </strong>{book.details?.rating}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>summary: </strong>{book.details?.summary}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>shelf: </strong>{book.shelf?.name}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>pages read: </strong>{book.note?.pageRead}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>favorite: </strong>{book.note?.favorite ? "yes" : "no"}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>date added: </strong>{book.note?.dateAdded?.substring(0,10)}</Text>
              <Text style={{ marginLeft: 10 }} size="md"><strong>comments: </strong>{book.note?.comments}</Text>
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
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <ScrollArea >
            <Stack>
              <Group>
                <Text weight={500}>Bookshelves</Text>
                <Text variant="link" component={Link} to="/editShelves">(Edit)</Text>
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

              <Divider my="xs" label="Shelves" labelPosition="center" />
              {userShelves.map(shelf => (
                <Text
                  className='btn'
                  component='button'
                  variant="link"
                  key={shelf.id}
                  onClick={() => {
                    setBooksList([...userBooks.filter(b => b.shelf.id === shelf.id)])
                  }}
                >
                  {shelf ?  `${shelf.name} (${[...new Set(shelf.books.map(book => book.id))].length})` : ""}
                </Text>
              ))}
             
              <Space h="md" />
              <Modal
                title={<Badge component="a" size='lg' variant="outline">
                  Add Shelf
                </Badge>}

                opened={openedAddShelf}
                onClose={() => {
                  setOpenedAddShelf(false)
                  let formObj = shelfForm
                  formObj = {
                    ...formObj,
                    name: '',
                  }
                  shelfForm.setValues({...formObj})
                }}
              >
                <Center>
                  {notifShelfClass === 'error'
                    ? <Notification disallowClose icon={<X size={18} />} color="red">
                        {notifShelfMessage}
                      </Notification>            
                    : notifShelfClass === 'success' 
                    ? <Notification disallowClose icon={<Check size={18} />} color="teal">
                        {notifShelfMessage}
                      </Notification>
                    : null
                  }
                </Center>
                <Space h="md" />
                <Box mx="auto">
                  <form onSubmit={event => {
                    event.preventDefault()
                    addShelf(shelfForm.values)
                  }
                  }>
                    <InputWrapper
                      label="Name"
                      description="What name do you want to give to your shelf?"        
                    >
                      <TextInput
                        {...shelfForm.getInputProps('name')}
                      />
                    </InputWrapper>

                    <Group position="right" mt="md">
                      <Button type="submit">Submit</Button>
                    </Group>
                  </form>
                </Box>

              </Modal>

              <Button variant="outline" onClick={() => setOpenedAddShelf(true)}>Add shelf</Button>
              <Divider my="xs" label="Books" labelPosition="center" />
              <Modal
                size='70%'
                title={<Badge component="a" size='lg' variant="outline">
                  Add Book Manually
                </Badge>}
              
                opened={openedAddBook}
                onClose={() => {
                  setOpenedAddBook(false)
                  let formObj = form
                  formObj = {
                    ...formObj,
                    title: '',
                    authors: '',
                    publisher: '',
                    isbn: '',
                    format: '',
                    genre: '',
                    publishedDate: '',
                    pageNumber: '',
                    language: '',
                    price: '',
                    series: '',
                    vol: '',
                    quantity: '',
                    rating: '',
                    summary: '',
                    image: '',
                    pageRead: '',
                    favorite: false,
                    dateAdded: '',
                    comments: '',
                    shelf: ''   
                  }
                  form.setValues({...formObj})
                }}
              >
              <Box mx="auto">
                <form onSubmit={event => {
                  event.preventDefault()
                  let bookObj = {
                    details: {
                      title: form.values.title,
                      authors: form.values?.authors?.split(', ').map(a => ({
                        authorName: a
                      })),
                      publisher: form.values?.publisher,
                      isbn: form.values?.isbn,
                      format: form.values?.format,
                      genre: form.values?.genre,
                      publishedDate: form.values?.publishedDate,
                      pageNumber: form.values?.pageNumber,
                      language: form.values?.language,
                      price: form.values?.price,
                      series: form.values?.series,
                      vol: form.values?.vol,
                      quantity: form.values?.quantity,
                      rating: form.values?.rating,
                      summary: form.values?.summary,
                      image: form.values?.image
                    },
                    note: {
                      pageRead: form.values?.pageRead,
                      favorite: form.values?.favorite,
                      dateAdded: form.values?.dateAdded,
                      comments: form.values?.comments 
                    },
                    shelf: form.values?.shelf
                  }
                  addBook(bookObj)
                }}>
                  <Divider my="xs" label="Book details" labelPosition="center" />
                  <InputWrapper
                    label="Title"
                    description="What's the title of your book?"        
                  >
                    <TextInput
                      required
                      {...form.getInputProps('title')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Authors"
                    description="Who are the authors of your book?, seperate the names by commas."        
                  >
                    <TextInput
                      {...form.getInputProps('authors')}

                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Publisher"
                    description="Who published your book?"        
                  >
                    <TextInput
                      {...form.getInputProps('publisher')}

                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="ISBN"
                    description="What's the ISBN 10 or 13 number of your book?"        
                  >
                    <TextInput
                      {...form.getInputProps('isbn')}

                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Format"
                    description="What's the format of your book?"        
                  >
                    <Select
                      {...form.getInputProps('format')}
                      data={[
                        { value: 'Hardcover', label: 'Hardcover' },
                        { value: 'Paperback', label: 'Paperback' },
                        { value: 'Mass-Market Paperback', label: 'Mass-Market Paperback' },
                        { value: 'Library Binding', label: 'Library Binding' },
                        { value: 'Spiral Binding', label: 'Spiral Binding' },
                      ]}
                    /> 
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Genre"
                    description="What's the genre of your book?"        
                  >
                    <Select
                    {...form.getInputProps('genre')}
                      data={[
                        { value: 'Arts & Photography', label: 'Arts & Photography' },
                        { value: 'Biographies & Memoirs', label: 'Biographies & Memoirs' },
                        { value: 'Business & Money', label: 'Business & Money' },
                        { value: 'Calendars', label: 'Calendars' },
                        { value: "Children's Books", label: "Children's Books" },
                        { value: 'Comics & Graphic Novels', label: "Comics & Graphic Novels" },
                        { value: 'Computers & Technology', label: "Computers & Technology" },
                        { value: 'Cookbooks, Food & Wine', label: "Cookbooks, Food & Wine" },
                        { value: 'Crafts, Hobbies & Home', label: "Crafts, Hobbies & Home" },
                        { value: 'Christian Books & Bibles', label: "Christian Books & Bibles" },
                        { value: 'Engineering & Transportation', label: "Engineering & Transportation" },
                        { value: 'Health, Fitness & Dieting', label: "Health, Fitness & Dieting" },
                        { value: 'History', label: "History" },
                        { value: 'Humor & Entertainment', label: "Humor & Entertainment" },
                        { value: 'Law', label: "Law" },
                        { value: 'Literature & Fiction', label: "Literature & Fiction" },
                        { value: 'Medical Books', label: "Medical Books" },
                        { value: 'Mystery, Thriller & Suspense', label: "Mystery, Thriller & Suspense" },
                        { value: 'Parenting & Relationships', label: "Parenting & Relationships" },
                        { value: 'Politics & Social Sciences', label: "Politics & Social Sciences" },
                        { value: 'Reference', label: "Reference" },
                        { value: 'Religion & Spirituality', label: "Religion & Spirituality" },
                        { value: 'Romance', label: "Romance" },
                        { value: 'Science & Math', label: "Science & Math" },
                        { value: 'Science Fiction & Fantasy', label: "Science Fiction & Fantasy" },
                        { value: 'Self-Help', label: "Self-Help" },
                        { value: 'Sports & Outdoors', label: "Sports & Outdoors" },
                        { value: 'Teen & Young Adult', label: "Teen & Young Adult" },
                        { value: 'Test Preparation', label: "Test Preparation" },
                        { value: 'Travel', label: "Travel" },
                        { value: 'Education & Teaching', label: "Education & Teaching" },
                        { value: 'Other', label: "Other" },
                      ]}
                    /> 
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Date published"
                    description="When was your book published?"        
                  >
                    <DatePicker  
                      {...form.getInputProps('publishedDate')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Number of pages"
                    description="How many pages your book contain?"        
                  >
                    <NumberInput
                      {...form.getInputProps('pageNumber')}
                      min={10}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Language"
                    description="In which language your book is written?"        
                  >
                    <Select
                      {...form.getInputProps('language')}
                      data={[
                        { value: 'English', label: 'English' },
                        { value: 'French', label: 'French' },
                        { value: 'German', label: 'German' },
                        { value: 'Italian', label: 'Italian' },
                        { value: 'Japenese', label: 'Japenese' },
                      ]}
                    /> 
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Price"
                    description="What's the price of your book?"        
                  >
                    <NumberInput
                      {...form.getInputProps('price')}
                      defaultValue={1000}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                          ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : '$ '
                      }
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Series"
                    description="To which series this book belongs?"        
                  >
                    <TextInput
                      {...form.getInputProps('series')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Volume"
                    description="What volume is this book?"        
                  >
                    <NumberInput
                      min={0}
                      {...form.getInputProps('vol')}

                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Quantity"
                    description="Indicate the quantity of your book?"        
                  >
                    <NumberInput
                      min={0}
                      {...form.getInputProps('quantity')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Rating"
                    description="What's the rating of your book?"        
                  >
                    <NumberInput
                      {...form.getInputProps('rating')}
                      precision={2}
                      min={0}
                      step={0.05}
                      max={5}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Summary"
                    description="What's your book about?"        
                  >
                    <Textarea
                      {...form.getInputProps('summary')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Cover"
                    description="Insert a cover image for your book."        
                  >
                    <FileBase64
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      multiple={false}
                      onDone={({ base64 }) => form.setFieldValue('image', base64)}
                    />
                  </InputWrapper>

                  <Divider my="xs" label="Book note" labelPosition="center" />
                  <Space h="md" />
                  <InputWrapper
                    label="Number of pages read"
                    description="How many pages have you read from your book?"        
                  >
                    <NumberInput
                      min={0}
                      {...form.getInputProps('pageRead')}

                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Favorite"
                    description="Is this book one of your favorites?"        
                  >
                    <Switch onLabel="Yes" offLabel="No" size='xl'
                      checked={form.values?.favorite}
                      onChange={(event) => {
                      form.setFieldValue("favorite", event.currentTarget.checked)}}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Date added"
                    description="When did you add this book to your library?"        
                  >
                    <DatePicker  
                      {...form.getInputProps('dateAdded')}
                    />
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Comments"
                    description="Do you have any comments about your book?"        
                  >
                    <Textarea
                      {...form.getInputProps('comments')}
                    />
                  </InputWrapper>
                  <Divider my="xs" label="Book shelf" labelPosition="center" />
                  <Space h="md" />
                  <InputWrapper
                    label="Shelf"
                    description="In which shelf you want to put your book?"        
                  >
                    <Select
                      {...form.getInputProps('shelf')}
                      data={
                        userShelves.map(shelf => ({
                          value: shelf.id,
                          label: shelf.name
                        }))
                      }
                    /> 
                  </InputWrapper>
                  <Space h="md" />

                  <Center>
                  {notifBookClass === 'error'
                    ? <Notification disallowClose icon={<X size={18} />} color="red">
                        {notifBookMessage}
                      </Notification>            
                    : notifBookClass === 'success' 
                    ? <Notification disallowClose icon={<Check size={18} />} color="teal">
                        {notifBookMessage}
                      </Notification>
                    : null
                  }
                </Center>


                  <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
                </form>
              </Box>
                <Space h="md" />

              </Modal>
        
              <Button variant="outline" onClick={() => setOpenedAddBook(true)}>Add book manually</Button>
              {/* <Divider my="xs" label="Statistics" labelPosition="center" />
              <Text variant="link" component={Link} to="/somewhere">Reading activity</Text>
              <Text variant="link" component={Link} to="/somewhere">Books statistics</Text>
              <Text variant="link" component={Link} to="/somewhere">Shelves statistics</Text>
              <Divider my="xs" />
              <Modal
              title={<Badge component="a" color='red' size='lg' variant="outline">
                Delete Library
              </Badge>}

              opened={openedDeleteLibrary}
              onClose={() => setOpenedDeleteLibrary(false)}
              >
              <Alert icon={<AlertCircle size={16} />}  color="red">
                <div><strong>By deleting your library, you will delete all your books, shelves and any information associated with them.</strong></div>
                Do you want to proceed to deletion?
              </Alert>
              <Space h="md" />
              <Center>
              <Button color="red">
                Delete library
              </Button>
              </Center>
              </Modal>

              <Button color="red" onClick={() => setOpenedDeleteLibrary(true)}>
                Delete library
              </Button> */}
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
          <Menu control={<Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl">{username.substring(0,2)}</Avatar>}>
            <Menu.Label>{username}</Menu.Label>
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

export default Home