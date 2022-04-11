/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Group, Button, Box, Text, AppShell,
	Header,
	Footer,
	MediaQuery,
	Burger,
	useMantineTheme,
	Title,
	Center, } from '@mantine/core'
import { useState } from 'react'

const SignIn = ({
	handleSignIn,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {
	const theme = useMantineTheme()
	const [opened, setOpened] = useState(false)

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
	})

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
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			footer={
				<Footer height={60} p="md">
            &copy; Booksgenix 2022 Inc
				</Footer>
			}
			header={
				<Header height={70} p="md">
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
					</div>
				</Header>
			}
		>
			<Center>
				<Text>Sign in to Booksgenix</Text>
			</Center>
			<Center>
				<Box sx={{ maxWidth: 340 }} mx="auto">
					<form onSubmit={handleSignIn}>
						<TextInput
							label="Username"
							placeholder="Username"
							{...usernameObj}
							required
						/>
    
						<PasswordInput
							label="Password"
							placeholder="Password"
							{...passwordObj}
							required
						/>
    
						<Text size="md">not a member ?</Text>
						<Text variant="link" component={Link} to="/signup">sign up</Text>

						<Group position="right" mt="md">
							<Button type="submit">Submit</Button>
						</Group>
					</form>
				</Box>

			</Center>
		</AppShell>
  
	)
        
}

SignIn.propTypes = {
	handleSignIn: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default SignIn