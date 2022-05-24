import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Box,
  Text,
  AppShell,
  Footer,
  useMantineTheme,
  Center,
  Notification,
  Container,
  Stack,
  Space
} from '@mantine/core'
import { Check, X } from 'tabler-icons-react';


const SignUp = ({
  handleSignUp,
  handleNameChange,
  handleUsernameChange,
  handlePasswordChange,
  name,
  username,
  password,
  notifMessage,
  notifClass
}) => {
  const theme = useMantineTheme()

  const form = useForm({
    initialValues: {
      name: '',
      username: '',
      password: ''
    }
  })

  let nameObj = {
    ...form.getInputProps('name'),
    value: name,
    onChange: handleNameChange
  }
  let usernameObj = {
    ...form.getInputProps('username'),
    value: username,
    onChange: handleUsernameChange
  }

  let passwordObj = {
    ...form.getInputProps('password'),
    value: password,
    onChange: handlePasswordChange
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
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
    >
            <Container size="sm">
        <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
        <Center>
        <Text weight={700}>Sign up to Booksgenix</Text>
      </Center>
      <Center>
        {notifClass === 'error'
          ? <Notification disallowClose icon={<X size={18} />} color="red">
              {notifMessage}
            </Notification>            
          : notifClass === 'success' 
          ? <Notification disallowClose icon={<Check size={18} />} color="teal">
              {notifMessage}
            </Notification>
          : null
        }
      </Center>

      <Center>
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <form onSubmit={handleSignUp}>
            <TextInput label="Name" placeholder="Name" {...nameObj} required />

            <TextInput label="Username" placeholder="Username" {...usernameObj} required />

            <PasswordInput label="Password" placeholder="Password" {...passwordObj} required />


            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Center>

            <Center>
            <Text size="md">already a member ?</Text>
            <Space w='md'/>

            <Text variant="link" component={Link} to="/signin">
              sign in
            </Text>

            </Center>
        </Stack>
        </Container>
    </AppShell>
  )
}

SignUp.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default SignUp