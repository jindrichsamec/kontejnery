import ReactGA from 'react-ga'
import createHistory from 'history/createBrowserHistory'

if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export const createGaHistroy = () => {
  const history = createHistory()
  history.listen((location, action) => {
    if (!process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      return
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return history
}
