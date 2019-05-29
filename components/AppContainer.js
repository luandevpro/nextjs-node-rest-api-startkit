import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Context } from '../contexts';
import { useCount } from '../reducers';
import { theme } from '../lib/theme';

function AppContainer({ children }) {
  const state = {
    count: useCount(1),
  };
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </ThemeProvider>
  );
}

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContainer;
