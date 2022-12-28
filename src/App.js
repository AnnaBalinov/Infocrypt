import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import { userService } from './services/userService'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { CryptoPage } from './pages/CryptoPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'

function App() {

  const user = userService.query()
  const PrivateRoute = ({ path, component }) => {
    return user ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to="/" />
    )
  }

  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEditPage} />
          <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
          <PrivateRoute path="/contact/" component={ContactPage} />
          <Route path="/cryptoInfo/" component={CryptoPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
