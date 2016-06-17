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
			require('./routes/SignIn.js'),
			require('./routes/OrderList.js'),
			require('./routes/OrderDetail.js'),
			require('./routes/OrderSearch.js'),
			require('./routes/Ship.js'),
			require('./routes/ShipSuccess.js'),
			require('./routes/EditAddress.js'),
			require('./routes/AddressList.js'),
			require('./routes/AddressMgr.js'),
			require('./routes/LogiDetail.js'),
			require('./routes/WXSignIn.js'),
			require('./routes/Trace.js'),
			require('./routes/SignOut.js'),
			{
				path: '*',
				component: require('./components/NotFound.js')
			}
		]
	}]
};

render(
	<Router history={browserHistory} routes={rootRoute} render={(props) => <AsyncProps {...props} renderLoading={() => <div className="text-center"><div className="app-loader"></div>加载中...</div>} />} />,
	document.getElementById('app')
	);
