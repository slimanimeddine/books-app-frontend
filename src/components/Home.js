const Home = ({ username, handleSignOut}) => {
    return (
        <div>
            <strong>{username}</strong> logged in
            <button onClick={handleSignOut}>sign out</button>
        </div>
    )
}

export default Home