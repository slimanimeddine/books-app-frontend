import React, { useState } from 'react'
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
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle } from 'tabler-icons-react'
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

const Home = ({ username, handleSignOut, books, shelves, addShelf, addBook, notifShelfMessage, notifBookMessage}) => {
  const userBooks = books.filter(book => book.user.username.toString() === username)
  const userShelves = shelves.filter(shelf => shelf.user.username.toString() === username)

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

  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [openedEdit, setOpenedEdit] = useState(Array(userBooks.length).fill(false))
  const [openedRemove, setOpenedRemove] = useState(Array(userBooks.length).fill(false))
  const [openedDetails, setOpenedDetails] = useState(Array(userBooks.length).fill(false))
  const [openedAddBook, setOpenedAddBook] = useState(false)
  const [openedAddShelf, setOpenedAddShelf] = useState(false)
  const [openedDeleteLibrary, setOpenedDeleteLibrary] = useState(false)


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
      <td>{book.details.authors ? book.details.authors.map(author => author.authorName).join(', ') : "not set"}</td>
      <td>{book.details.rating ? book.details.rating : "not set"}</td>
      <td>{book.shelf ? book.shelf.name : "not set"}</td>
      <td>{book.note.dateAdded ? book.note.dateAdded.substring(0, 10) : "not set"}</td>
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
          key={book.id}
        >
        <Box mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                value="Robin Sharma"
                {...form.getInputProps('authors')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Publisher"
              description="Who published your book?"        
            >
              <TextInput
                value="Harper"
                {...form.getInputProps('publisher')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="ISBN"
              description="What's the ISBN 10 or 13 number of your book?"        
            >
              <TextInput
                value="1564868464531"
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
                  { value: 'hardcover', label: 'Hardcover' },
                  { value: 'paperback', label: 'Paperback' },
                  { value: 'massMarketPaperback', label: 'Mass-Market Paperbackte' },
                  { value: 'libraryBinding', label: 'Library Binding' },
                  { value: 'spiralBinding', label: 'Spiral Binding' },
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
                  { value: 'artsAndPhotography', label: 'Arts & Photography' },
                  { value: 'biographiesAndMemoirs', label: 'Biographies & Memoirs' },
                  { value: 'businessAndMoney', label: 'Business & Money' },
                  { value: 'calendars', label: 'Calendars' },
                  { value: 'childrensBooks', label: "Children's Books" },
                  { value: 'comicsAndGraphicNovels', label: "Comics & Graphic Novels" },
                  { value: 'computersAndTechnology', label: "Computers & Technology" },
                  { value: 'cookbooksFoodAndWine', label: "Cookbooks, Food & Wine" },
                  { value: 'craftsHobbiesAndHome', label: "Crafts, Hobbies & Home" },
                  { value: 'christianBooksAndBibles', label: "Christian Books & Bibles" },
                  { value: 'engineeringAndTransportation', label: "Engineering & Transportation" },
                  { value: 'healthFitnessAndDieting', label: "Health, Fitness & Dieting" },
                  { value: 'history', label: "History" },
                  { value: 'humorAndEntertainment', label: "Humor & Entertainment" },
                  { value: 'law', label: "Law" },
                  { value: 'literatureAndFiction', label: "Literature & Fiction" },
                  { value: 'medicalBooks', label: "Medical Books" },
                  { value: 'mysteryThrillerAndSuspense', label: "Mystery, Thriller & Suspense" },
                  { value: 'parentingAndRelationships', label: "Parenting & Relationships" },
                  { value: 'politicsAndSocialSciences', label: "Politics & Social Sciences" },
                  { value: 'reference', label: "Reference" },
                  { value: 'religionAndSpirituality', label: "Religion & Spirituality" },
                  { value: 'romance', label: "Romance" },
                  { value: 'scienceAndMath', label: "Science & Math" },
                  { value: 'scienceFictionAndFantasy', label: "Science Fiction & Fantasy" },
                  { value: 'selfHelp', label: "Self-Help" },
                  { value: 'sportsAndOutdoors', label: "Sports & Outdoors" },
                  { value: 'teenAndYoungAdult', label: "Teen & Young Adult" },
                  { value: 'testPreparation', label: "Test Preparation" },
                  { value: 'travel', label: "Travel" },
                  { value: 'educationAndTeaching', label: "Education & Teaching" },
                  { value: 'other', label: "Other" },
                ]}
              /> 
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Date published"
              description="When was your book published?"        
            >
              <DatePicker allowLevelChange={false} 
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
                  { value: 'english', label: 'English' },
                  { value: 'french', label: 'French' },
                  { value: 'german', label: 'German' },
                  { value: 'italian', label: 'Italian' },
                  { value: 'japenese', label: 'Japenese' },
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
              {/* <Input type='file' accept="image/png, image/gif, image/jpeg"
                {...form.getInputProps('image')}

              /> */}
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
                {...form.getInputProps('favorite')}

              />
            </InputWrapper>
            <Space h="md" />
            <InputWrapper
              label="Date added"
              description="When did you add this book to your library?"        
            >
              <DatePicker allowLevelChange={false} 
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
                  shelves.map(shelf => ({
                    value: shelf.name,
                    label: shelf.name
                  }))
                }
              /> 
            </InputWrapper>

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
            title: book.details.title,
            authors: book.details.authors.map(author => author.authorName).join(', '),
            publisher: book.details.publisher,
            isbn: book.details.isbn,
            format: book.details.format,
            genre: book.details.genre,
            publishedDate: book.details.publishedDate,
            pageNumber: book.details.pageNumber,
            language: book.details.language,
            price: book.details.price,
            series: book.details.series,
            vol: book.details.vol,
            quantity: book.details.quantity,
            rating: book.details.rating,
            summary: book.details.summary,
            image: book.details.image,
            pageRead: book.note.pageRead,
            favorite: book.note.favorite,
            dateAdded: book.note.dateAdded,
            comments: book.note.comments,
            shelf: book.shelf.name  
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
          key={book.id}
        >
          <Alert icon={<AlertCircle size={16} />}  color="red">
            Are you sure you want to delete <strong>{book.details.title}</strong> from your books?  
          </Alert>
          <Space h="md" />
          <Center>
          <Button color="red">
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
          key={book.id}

        >
          <Grid>
            <Grid.Col span={4}>
              <Image 
                src={book.details.image}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text weight={700}>{book.details.title}</Text>
              <Text size="md">by {book.details.authors ? book.details.authors.map(author => author.authorName).join(', ') : "not set"}</Text>
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
                <Text variant="link" component={Link} to="/somewhere">(Edit)</Text>
              </Group>
              <Text variant="link" component={Link} to="/somewhere">all ({userBooks.length})</Text>
              <Divider my="xs" label="Shelves" labelPosition="center" />
              {userShelves.map(shelf => (
                <Text key={shelf.id} variant="link" component={Link} to="/somewhere">{shelf ?  `${shelf.name} (${shelf.books.length})` : ""}</Text>  
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
                  {notifShelfMessage !== '' &&
                     <Notification icon={<X size={18} />} color="red">
                      {notifShelfMessage}
                    </Notification>                              
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
                    favorite: '',
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
                      authors: form.values.authors !== '' ? form.values.authors.split(',') : [],
                      publisher: form.values.publisher,
                      isbn: form.values.isbn !== '' ? form.values.isbn : '0000000000',
                      format: form.values.format,
                      genre: form.values.genre,
                      publishedDate: form.values.publishedDate !== '' ? form.values.publishedDate : new Date(),
                      pageNumber: form.values.pageNumber !== '' ? form.values.pageNumber : 0,
                      language: form.values.language,
                      price: form.values.price !== '' ? form.values.price : 0,
                      series: form.values.series,
                      vol: form.values.vol,
                      quantity: form.values.quantity,
                      rating: form.values.rating !== '' ? form.values.rating : 0,
                      summary: form.values.summary,
                      image: form.values.image
                    },
                    note: {
                      pageRead: form.values.pageRead !== '' ? form.values.pageRead : 0,
                      favorite: form.values.favorite !== '' ? form.values.favorite : false,
                      dateAdded: form.values.dateAdded !== '' ? form.values.dateAdded : new Date(),
                      comments: form.values.comments 
                    },
                    shelf: form.values.shelf
                  }
                  console.log(bookObj)
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
                        { value: 'hardcover', label: 'Hardcover' },
                        { value: 'paperback', label: 'Paperback' },
                        { value: 'massMarketPaperback', label: 'Mass-Market Paperbackte' },
                        { value: 'libraryBinding', label: 'Library Binding' },
                        { value: 'spiralBinding', label: 'Spiral Binding' },
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
                        { value: 'artsAndPhotography', label: 'Arts & Photography' },
                        { value: 'biographiesAndMemoirs', label: 'Biographies & Memoirs' },
                        { value: 'businessAndMoney', label: 'Business & Money' },
                        { value: 'calendars', label: 'Calendars' },
                        { value: 'childrensBooks', label: "Children's Books" },
                        { value: 'comicsAndGraphicNovels', label: "Comics & Graphic Novels" },
                        { value: 'computersAndTechnology', label: "Computers & Technology" },
                        { value: 'cookbooksFoodAndWine', label: "Cookbooks, Food & Wine" },
                        { value: 'craftsHobbiesAndHome', label: "Crafts, Hobbies & Home" },
                        { value: 'christianBooksAndBibles', label: "Christian Books & Bibles" },
                        { value: 'engineeringAndTransportation', label: "Engineering & Transportation" },
                        { value: 'healthFitnessAndDieting', label: "Health, Fitness & Dieting" },
                        { value: 'history', label: "History" },
                        { value: 'humorAndEntertainment', label: "Humor & Entertainment" },
                        { value: 'law', label: "Law" },
                        { value: 'literatureAndFiction', label: "Literature & Fiction" },
                        { value: 'medicalBooks', label: "Medical Books" },
                        { value: 'mysteryThrillerAndSuspense', label: "Mystery, Thriller & Suspense" },
                        { value: 'parentingAndRelationships', label: "Parenting & Relationships" },
                        { value: 'politicsAndSocialSciences', label: "Politics & Social Sciences" },
                        { value: 'reference', label: "Reference" },
                        { value: 'religionAndSpirituality', label: "Religion & Spirituality" },
                        { value: 'romance', label: "Romance" },
                        { value: 'scienceAndMath', label: "Science & Math" },
                        { value: 'scienceFictionAndFantasy', label: "Science Fiction & Fantasy" },
                        { value: 'selfHelp', label: "Self-Help" },
                        { value: 'sportsAndOutdoors', label: "Sports & Outdoors" },
                        { value: 'teenAndYoungAdult', label: "Teen & Young Adult" },
                        { value: 'testPreparation', label: "Test Preparation" },
                        { value: 'travel', label: "Travel" },
                        { value: 'educationAndTeaching', label: "Education & Teaching" },
                        { value: 'other', label: "Other" },
                      ]}
                    /> 
                  </InputWrapper>
                  <Space h="md" />
                  <InputWrapper
                    label="Date published"
                    description="When was your book published?"        
                  >
                    <DatePicker allowLevelChange={false} 
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
                        { value: 'english', label: 'English' },
                        { value: 'french', label: 'French' },
                        { value: 'german', label: 'German' },
                        { value: 'italian', label: 'Italian' },
                        { value: 'japenese', label: 'Japenese' },
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
                    <Input type='file' accept="image/png, image/gif, image/jpeg"
                      {...form.getInputProps('image')}

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
                    <DatePicker allowLevelChange={false} 
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
                        shelves.map(shelf => ({
                          value: shelf.name,
                          label: shelf.name
                        }))
                      }
                    /> 
                  </InputWrapper>
                  <Space h="md" />

                  <Center>
                  {notifBookMessage !== '' &&
                     <Notification icon={<X size={18} />} color="red">
                      {notifBookMessage}
                    </Notification>                              
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
              <Divider my="xs" label="Statistics" labelPosition="center" />
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
              </Button>
            </Stack>
          </ScrollArea>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Divider my="xs" label="Sort your books" labelPosition="center" />
            <RadioGroup label="Select sorting criterias">
              <Radio value="asc" label="asc" />
              <Radio value="desc" label="desc" />
            </RadioGroup>
            <Space h="md" />
            <Select
            allowDeselect
              maxDropdownHeight={280}
              placeholder="Choose criteria"
              data={[
                { value: 'authors', label: 'authors' },
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
            <Divider my="xs" label="Search among your books" labelPosition="center" />
            <Select
              label="Enter title"
              placeholder="Search book"
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
          <Title order={1}>Booksgenix</Title>
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <TextInput style={{ width: 670 }} placeholder="search and add books" icon={<Search size={14} />} />
          <Space w="xs" />
          <Button>
            Search
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