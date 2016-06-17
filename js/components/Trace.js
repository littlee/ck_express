require('../../less/trace.less');
var React = require('react');
var TraceUtil = require('../utils/TraceUtil.js');

var fto = require('form_to_object');
var ErrorMessage = require('./ErrorMessage.js');

var errMap = {
	'empty_code': '请选择物流公司',
	'empty_num': '请输入快递单号'
};

var Trace = React.createClass({
	statics: {
		loadProps: function(params, cb) {
			TraceUtil.getData(function(res) {
				cb(null, {
					data: res
				});
			});
		}
	},

	getInitialState: function() {
		return {
			name: '',
			shipperCode: '',
			list: [],
			reason: '',
			traces: []
		};
	},

	render: function() {
		var items = this.state.list.map(function(item, index) {
			return (<li className="list-group-item" key={index} onClick={this._setCode.bind(this, item.name, item.code)}>{item.name}</li>);
		}, this);

		var traces = this.state.traces.map(function(item, index) {
			return (<p key={index}>{item.AcceptStation + item.AcceptTime}</p>);
		});

		return (
			<div className="row">
				<div className="col-xs-12 trim-col">
					<div className="trace">
						<div className="trace-header">
							物流跟踪
						</div>
						<form className="trace-body" onSubmit={this._submit}>
							<div className="form-group">
								<label>
									物流公司
								</label>
								<input type="text" className="form-control" onChange={this._search} value={this.state.name}/>
								<input type="hidden" name="shipperCode" value={this.state.shipperCode}/>

								<ul className="list-group">
									{items}
								</ul>
							</div>
							<div className="form-group">
								<label>
									快递单号
								</label>
								<input type="text" name="logisticCode" className="form-control" />
							</div>
							<ErrorMessage error={this.state.error} />
							<div className="form-group">
								<button type="submit" className="btn btn-primary btn-block">
									查询
								</button>
							</div>

							{
								this.state.reason === '' ?
								(
									traces.length > 0 ?
									<div className="panel panel-success">
										<div className="panel-body">
											{traces}
										</div>
									</div> : null
								)
								:
								<div className="panel panel-danger">
									<div className="panel-body">
										{this.state.reason}
									</div>
								</div>
							}
						</form>
					</div>
				</div>
			</div>
			);
	},

	_setCode: function(n, c) {
		this.setState({
			name: n,
			shipperCode: c,
			list: []
		});
	},

	_search: function(e) {
		var t = e.target.value;
		this.setState({
			name: t
		});
		if (t.trim() === '') {
			this.setState({
				list: []
			});
			return;
		}

		var list = Object.keys(this.props.data).map(function(key) {
			return {
				code: this.props.data[key],
				name: key
			};
		}, this);

		list = list.filter(function(item) {
			var r = new RegExp(t, "i");
			return r.test(item.name) || r.test(item.code);
		});

		this.setState({
			list: list,
			shipperCode: ''
		});
	},

	_submit: function(e) {
		e.preventDefault();
		var data = fto(e.target);

		if (!data.shipperCode) {
			this.setState({
				error: errMap['empty_code']
			});
			return false;
		}

		if (!data.logisticCode) {
			this.setState({
				error: errMap['empty_num']
			});
			return false;
		}

		var fd = new FormData();
		fd.append('shipperCode', data.shipperCode);
		fd.append('logisticCode', data.logisticCode);
		TraceUtil.submit(fd, function(res) {
			if (res.Reason) {
				this.setState({
					reason: res.Reason
				});
				return;
			}
			this.setState({
				reason: '',
				traces: res.Traces
			});
		}.bind(this));
	}
});

module.exports = Trace;
