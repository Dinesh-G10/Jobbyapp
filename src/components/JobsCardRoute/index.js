import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobsCardRoute = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  return (
    <>
      <Link to={`/jobs/${id}`}>
        <li className="eachJob-container">
          <div className="job-item-container">
            <div className="first-part-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="star-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating-text">{rating}</p>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-job-type-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location">{location}</p>
                </div>
                <div className="employment-type-icon-employment-type-container">
                  <p className="job-type">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr className="item-hr-line" />
          <div className="second-part-container">
            <h1 className="description-heading">Description</h1>
            <p className="description-para">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default JobsCardRoute
