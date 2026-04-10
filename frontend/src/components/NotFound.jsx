import { Link } from 'react-router-dom';
import './styles/NotFound.css';

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page does not exist</p>
      <Link to="/" className="notfound-link">Go back home</Link>
    </div>
  );
}

export default NotFound;
