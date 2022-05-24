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
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle, Check } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useForm } from '@mantine/form';

const Shelves = ({
  handleSignOut,
  shelves,
  user,
  updateShelf,
  deleteShelf,
  notifShelfClass,
  notifShelfMessage,
  handleSearch
}) => {
    
  const userShelves = shelves.filter(shelf => shelf.user?.username?.toString() === user.username)
  const form = useForm({
    initialValues: {
      name: ''
    }
  })

  const searchForm = useForm({
    initialValues: {
      title: ''
    }
  })


  const [openedEdit, setOpenedEdit] = useState(Array(userShelves.length).fill(false))
  const [openedRemove, setOpenedRemove] = useState(Array(userShelves.length).fill(false))
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const rows = userShelves.map(shelf => (
    <tr key={shelf.id}>
      <td>{shelf.name}</td>
      <td>
      <Modal
          title={<Badge component="a" size='lg' variant="outline">
            Edit Shelf
          </Badge>}
        
          opened={openedEdit[userShelves.indexOf(shelf)]}
          onClose={() => {
            let arr = openedEdit
            let ind = userShelves.indexOf(shelf)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedEdit([...arr])
            let formObj = form
            formObj = {
              ...formObj,
              name: '',
            }
            form.setValues({...formObj})
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
                updateShelf(shelf.id, {
                    name: form.values?.name
                })
            }}>
                <InputWrapper
                    label="Name"
                    description="What name do you want to give to your shelf?"        
                >
                    <TextInput
                    {...form.getInputProps('name')}
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
          let ind = userShelves.indexOf(shelf)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedEdit([...arr])
          let formObj = form
          formObj = {
            ...formObj,
            name: shelf.name,
          }
          form.setValues({...formObj})
        }}><Edit size={16} /></ActionIcon>
        <Modal
          title={<Badge component="a" color='red' size='lg' variant="outline">
            Remove Shelf
          </Badge>}
        
          opened={openedRemove[userShelves.indexOf(shelf)]}
          onClose={() => {
            let arr = openedRemove
            let ind = userShelves.indexOf(shelf)
            if (~arr) {
              arr[ind] = false;
            }
            setOpenedRemove([...arr])
          }}
        >
          <Alert icon={<AlertCircle size={16} />}  color="red">
            Are you sure you want to delete <strong>{shelf.name}</strong> from your shelves?  
          </Alert>
          <Space h="md" />
          <Center>
            <Button 
              color="red"
              onClick={() => {
                deleteShelf(shelf.id)
                let arr = openedRemove
                let ind = userShelves.indexOf(shelf)
                if (~arr) {
                  arr[ind] = false;
                }
                setOpenedRemove([...arr])
                arr = arr.filter((a, i) => i !== ind)
              }}
            >
              Delete Shelf
            </Button>
          </Center>
        </Modal>
        <ActionIcon variant="hover" component={Button} onClick={() => {
          let arr = openedRemove
          let ind = userShelves.indexOf(shelf)
          if (~arr) {
            arr[ind] = true;
          }
          setOpenedRemove([...arr])
        }}><X size={16} /></ActionIcon>
      </td>
    </tr>
  ));
 
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 400 }}>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
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
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
          <Space w="lg" />
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
                  <th>name</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    </AppShell>
  )
}

export default Shelves