import React from 'react';
import './App.css';
import PhonesPage from './Pages/PhonesPage';
import PhonerStore from './contexts/PhonerStoreContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

document.body.style.background =
  'linear-gradient(90deg, rgba(18,30,40,1) 0%, rgba(46,61,80,1) 100%)';

const outerTheme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: '#ffffff40 !important',
        },
      },
    },
    MuiInputBase: {
      root: {
        color: '#fff',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#ffffff60 !important',
      },
    },
    MuiTableSortLabel: {
      root: {
        color: '#ffffff !important',
      },
    },
  },
  palette: {
    secondary: {
      main: '#E75300',
    },
  },
});

export default function App() {
  const PHONES = (props) => {
    return <PhonesPage {...props} routeName="PHONES" />;
  };

  return (
    <ThemeProvider theme={outerTheme}>
      <div className="App">
        <PhonerStore>
          <Router basename="/">
            <Switch>
              <Route path="/" render={PHONES} exact />
            </Switch>
          </Router>
        </PhonerStore>
      </div>
    </ThemeProvider>
  );
}
