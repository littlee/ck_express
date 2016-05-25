require('../css/bootstrap.css');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;

var rootRoute = {
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

ReactDOM.render(
	<Router history={browserHistory} routes={rootRoute} />,
	document.getElementById('app')
);
