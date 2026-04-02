import "./styles/CardLayout.css";

function CardLayout({ children, id }) {
    return (
        <div id = {id} className = "card-layout">{children}</div>
    )
}

export default CardLayout;