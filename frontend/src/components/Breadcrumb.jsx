import { useLocation, Link } from 'react-router-dom';
import './styles/Breadcrumb.css';

function Breadcrumb() {

  const location = useLocation();
  let pathSegments = location.pathname.split('/').filter(Boolean);
  const validRoutes = [
    /^\/$/,
    /^\/home$/,
    /^\/login\/?$/,
    /^\/upload$/,
    /^\/admindashboard$/,
    /^\/register$/,
    /^\/profile$/,
    /^\/book\/edit\/.+$/
  ];

  if (pathSegments[0] === 'home') {
    pathSegments = pathSegments.slice(1);
  }

  if (!validRoutes.some((pattern) => pattern.test(location.pathname))) {
    return null;
  }

  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }


  return (
    <>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          {pathSegments.map((segment, index) => {
            const last = index === pathSegments.length - 1;
            const label = segment === 'admindashboard' ? 'Admin' : segment === 'test' ? 'Upload' : segment.charAt(0).toUpperCase() + segment.slice(1);
            const to = `/${pathSegments.slice(0, index + 1).join('/')}`;

            return (
              <span key={segment + index}>
                    <span>&gt;</span>
                    {last ? <span>{label}</span> : <Link to={to}>{label}</Link>}
              </span>
            );
          })}
        </div>
    </>
  );
}

export default Breadcrumb;
