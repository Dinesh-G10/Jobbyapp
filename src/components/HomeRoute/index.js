import './index.css'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

const HomeRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs,
          <br />
          salary information,company reviews.Find the job that fits <br />
          your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default HomeRoute
