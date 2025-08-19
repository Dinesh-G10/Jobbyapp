import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

const jobsContainer = [
  'Sales & Marketing',
  'Creative',
  'Human Resource',
  'Administration',
  'Digital Marketing',
  'Development',
  'Engineering',
]

const HomeRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">BROWSE OPEN POSITIONS BY CATEGORY</h1>
        <p className="home-para">
          We are always on the lookout for talanted people
        </p>
        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
        <ul className="jobs-container">
          {jobsContainer.map(each => {
            return (
              <div className="job-card">
                <li className="job-field">{each}</li>
                <span className="icon">+</span>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default HomeRoute
