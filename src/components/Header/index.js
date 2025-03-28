import './index.css'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-website-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-desktop-logo"
        />
        <ul className="website-nav-menu">
          <Link to="/">
            <li className="nav-link">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="nav-link">Jobs</li>
          </Link>
        </ul>
        <button
          onClick={logoutButton}
          className="website-logout-button"
          type="button"
        >
          Logout
        </button>
      </div>
      <div className="nav-menu-mobile">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-image-mobile"
        />
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li>
              <AiFillHome className="nav-menu-item-mobile" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="nav-menu-item-mobile" />
            </li>
          </Link>
          <li>
            <button
              onClick={logoutButton}
              className="nav-mobile-button"
              type="button"
            >
              <FiLogOut className="nav-menu-item-mobile" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
