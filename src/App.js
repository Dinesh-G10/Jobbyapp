import './App.css'
import {Switch, Route} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import Jobs from './components/JobsRoute'
import JobDetailsRoute from './components/JobDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetailsRoute} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
