require('../css/bootstrap.css');

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var AsyncProps = require('async-props');

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
	<Router history={browserHistory} routes={rootRoute} render={(props) => (
		<AsyncProps {...props} renderLoading={() => <div>Loading...</div>}/>
	)}/>,
	document.getElementById('app')
);
