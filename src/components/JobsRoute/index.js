import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobsCardRoute from '../JobsCardRoute'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    minimumPackage: 0,
    jobsList: [],
    employeeType: [],
    apiStatus: apiConstants.initial,
    searchInput: '',
    isProfile: true,
    profileList: [],
  }

  componentDidMount() {
    this.getUserDetails()
    this.onSearchJobs()
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = {
        name: fetchData.profile_details.name,
        profileImageUrl: fetchData.profile_details.profile_image_url,
        shortBio: fetchData.profile_details.short_bio,
      }
      this.setState({profileList: updatedData, isProfile: true})
    } else {
      this.setState({isProfile: false})
    }
  }

  onSearchJobs = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {employeeType, minimumPackage, searchInput} = this.state
    console.log(employeeType.join(','))
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${searchInput}`
    console.log(employeeType)
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({jobsList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeEmployment = event => {
    const {employeeType} = this.state
    const value = event.target.value
    if (employeeType.includes(value)) {
      const updatedList = employeeType.filter(each => each !== value)
      this.setState({employeeType: updatedList}, this.onSearchJobs)
    } else {
      this.setState(
        prevstate => ({
          employeeType: [...prevstate.employeeType, value],
        }),
        this.onSearchJobs,
      )
    }
  }

  onChangeSalary = event => {
    this.setState({minimumPackage: event.target.value}, this.onSearchJobs)
  }

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onSearchJobs()
    }
  }

  retryProfile = () => this.getUserDetails()

  onProfileDisplay = () => {
    const {profileList, isProfile} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div>
        {isProfile ? (
          <div className="profile-container">
            <img
              className="user-profile-image"
              src={profileImageUrl}
              alt="profile"
            />
            <h1 className="user-profile-name">G Dinesh</h1>
            <p className="user-profile-para">Front End Developer</p>
          </div>
        ) : (
          <div className="profile-failure-container">
            <button onClick={this.retryProfile} className="retry-button">
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }

  onRetryJobs = () => this.onSearchJobs()

  onJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={onRetryJobs} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    const isjobsListContain = jobsList.length > 0
    return (
      <div>
        {isjobsListContain ? (
          <ul className="jobsList-container">
            {jobsList.map(eachJob => (
              <JobsCardRoute eachJob={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div className="noJob-container">
            <img
              className="no-jobs-image"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="noJob-heading">No Jobs Found</h1>
            <p className="noJob-para">
              We Could not find any jobs.try other filters
            </p>
          </div>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobsList()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.onJobsFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-search-container">
          <div>
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onGetSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              data-testid="searchButton"
              type="button"
              className="search-button"
              onClick={this.onSearchJobs}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        <div className="jobs-card-container">
          <>
            <div className="user-profile-container">
              <div className="user-profile-card">{this.onProfileDisplay()}</div>
              <div className="job-filter-container">
                <hr className="horizontal-line" />
                <h1 className="employment-heading">Type of Employment</h1>
                <ul className="employment-list">
                  {employmentTypesList.map(each => {
                    return (
                      <li
                        key={each.employmentTypeId}
                        className="employment-list-item"
                      >
                        <input
                          onChange={this.onChangeEmployment}
                          type="checkbox"
                          name="employment"
                          id={each.employmentTypeId}
                          className="employment-input"
                        />
                        <label
                          key={each.label}
                          className="employment-label"
                          htmlFor={each.employmentTypeId}
                        >
                          {each.label}
                        </label>
                      </li>
                    )
                  })}
                </ul>
                <hr className="horizontal-line" />
                <h1 className="salary-heading">Salary Range</h1>
                <ul className="salary-list">
                  {salaryRangesList.map(each => {
                    return (
                      <li key={each.salaryRangeId} className="salary-list-item">
                        <input
                          onChange={this.onChangeSalary}
                          value={each.salaryRangeId}
                          type="radio"
                          name="salary"
                          id={each.salaryRangeId}
                          className="salary-input"
                        />
                        <label
                          key={each.label}
                          className="salary-label"
                          htmlFor={each.salaryRangeId}
                        >
                          {each.label}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </>
          {this.renderStatus()}
        </div>
      </>
    )
  }
}

export default Jobs
