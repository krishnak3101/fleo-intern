import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import ListingData from './ListingData';

function App() {
  return (
    <Fragment>
      <div style={{ minHeight: '50vh' }}>
        <Switch>
          <Route path="/" component={ListingData} />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
