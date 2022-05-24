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
import { Search, Logout, Settings, X, Edit, ListDetails, AlertCircle, Check, Bell, User, Friends } from 'tabler-icons-react'
import { Link } from 'react-router-dom'
import { useForm } from '@mantine/form'
import userService from '../services/users'
import notificationService from '../services/notifications'

const ResultsUsers = ({
  handleSignOut,
  user,
  handleSearch,
  queryUsers,
  users,
  notifications,
  username
}) => {
    

    const searchForm = useForm({
        initialValues: {
            title: ''
        }
    })
    
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const [usersSearched, setUsersSearched] = useState([])
  const currentUser = users.find(u => u.username === user.username)
  const userNotifications = notifications.filter(notification => notification.user?.username?.toString() === username)

  useEffect(() => {
    setUsersSearched(users.filter(u => ((u.username.includes(queryUsers) || u.name.includes(queryUsers)) && u.username != currentUser.username)))
  }, [])
console.log(users)
  const rows = usersSearched.map(u => (
    <tr key={u.id}>
      <td>{u.username}</td>
      <td>{u.name}</td>
      <td>{u.books.length}</td>
      <td>
        {
          currentUser.friends.find(u => u.toString() === u.id.toString())
          ? <Badge size='lg' variant="outline">
              Friend
            </Badge>
          : <Button
          compact
          color={currentUser.requestSent?.find(rq => rq.toString() == u.id.toString()) ? "red" : "blue"}
          onClick={async () => {
            if (currentUser.requestSent?.find(rq => rq.toString() == u.id.toString()) && u.requestReceived?.includes(currentUser.id)) {
              await userService.updateUser(currentUser.id, {
                requestSent: currentUser?.requestSent?.filter(rq => rq != u.id)
              })
              await userService.updateUser(u.id, {
                requestReceived: u.requestReceived?.filter(rq => rq != currentUser?.id),
              })  
            } else {
              await userService.updateUser(currentUser?.id, {
                requestSent: currentUser.requestSent?.concat(u.id)
              })
              const newNotif = await notificationService.addNotification({
                content: `${currentUser.username} sent you a friendship request.`,
                user: u.id
              })
              await userService.updateUser(u?.id, {
                requestReceived: u.requestReceived?.concat(currentUser.id),
                notifications: notifications.concat(newNotif)
              })    
            }
          }}
        >
          {currentUser.requestSent?.find(rq => rq.toString() == u.id.toString()) ? "cancel" : "add"}
        </Button>
        }
         {console.log(u.id, currentUser.id)}
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
                  <th>username</th>
                  <th>name</th>
                  <th>books</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>

    </AppShell>
  )
}

export default ResultsUsers