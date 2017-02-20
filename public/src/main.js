import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React from 'react';
import ReactDOM from 'react-dom';

import TableComponent from './components/table.js';

// Needed for onTouchTap, http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <TableComponent pagination="1" perPage="50"/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
