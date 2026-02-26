import "./styles/CardLayout.css";

function CardLayout({ children }) {
    return (
        <div className = "card-layout">{children.map((child,index) => <span key={index} className="card-item">{child}</span>)}</div>
    )
}

export default CardLayout;