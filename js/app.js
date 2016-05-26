import '../css/bootstrap.css';
import '../less/A.less';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AsyncProps from 'async-props';

const rootRoute = {
	component: 'div',
	childRoutes: [{
		path: '/',
		component: require('./components/App.js'),
		indexRoute: {
			component: require('./components/Home.js')
		},
		childRoutes: [
			require('./routes/Page.js'),
			{
				path: '*',
				component: require('./components/NotFound.js')
			}
		]
	}]
};

render(
	<Router history={browserHistory} routes={rootRoute} render={(props) => <AsyncProps {...props} renderLoading={() => <div>Loading...</div>} />} />,
	document.getElementById('app')
	);
