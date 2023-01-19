import './Navbar.css';

export const Navbar = (icon, startStop) => {
    return (
        <div className="navbar">
            <button
                className="button play-button"
                onClick={startStop}
            >
                {icon}
            </button>
        </div>
    );
}
