

export default function NotConnected() {
    return (
        <div>
            <h1>Vous devez être connecté pour accéder à cette page</h1>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    );
}