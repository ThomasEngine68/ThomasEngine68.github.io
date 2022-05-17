'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Control(props) {
	return React.createElement(
		"div",
		{ style: {
				width: "50px"
			} },
		React.createElement(
			"p",
			{ style: { textAlign: "center" } },
			props.dimensionIndex + 1
		),
		React.createElement(
			"div",
			{ style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					minHeight: "250px"
				} },
			React.createElement(
				"button",
				{ className: "button", disabled: !props.moves.validUp, onClick: props.onClickUp },
				"\u2B06"
			),
			React.createElement(
				"div",
				{ className: "mazeTileContainer" },
				[].concat(_toConsumableArray(props.areasOfDimension)).reverse().map(function (area, index) {
					return React.createElement("div", { key: Math.random(), className: "\n\t\t\t\t\t\tmazeTile\n\t\t\t\t\t\t" + (area.open ? "openMazeTile" : "walledMazeTile") + "\n\t\t\t\t\t\t" + (props.reversedPreviousAreasOfDimension[index].open ? "wasOpen" : "wasWalled") + "\n\t\t\t\t\t\t" + (area.player ? "hasPlayer" : "") + "\n\t\t\t\t\t\t" + (area.hadPlayer ? "hadPlayer" : "") + "\n\t\t\t\t\t\t" + (props.movedUp ? "movedUp" : "movedDown") + "\n\t\t\t\t\t\t" + (area.goal ? "hasGoal" : "") + "\n\t\t\t\t\t\t" + (props.reversedPreviousAreasOfDimension[index].goal ? "hadGoal" : "") + "\n\t\t\t\t\t\t" + (props.dimensionMoved == props.dimensionIndex ? "dimensionMoved" : "notDimensionMoved") + "\n\t\t\t\t\t\t" + ("dimensonTile" + props.dimensionIndex) + "\n\t\t\t\t\t\t"
					});
				})
			),
			React.createElement(
				"button",
				{ className: "button", disabled: !props.moves.validDown, onClick: props.onClickDown },
				"\u2B07"
			)
		)
	);
}

var Timer = function (_React$Component) {
	_inherits(Timer, _React$Component);

	function Timer(props) {
		_classCallCheck(this, Timer);

		var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

		_this.state = {
			gameStart: _this.props.gameStart
		};
		_this.state.timeDisplay = convertMsToMinutesSeconds(new Date() - _this.props.gameStart);
		_this.updateTimer = _this.updateTimer.bind(_this);
		_this.timerInterval = setInterval(_this.updateTimer, 20);
		return _this;
	}

	_createClass(Timer, [{
		key: "updateTimer",
		value: function updateTimer() {
			if (!this.props.gameWon) {
				var timeDisplay = convertMsToMinutesSeconds(new Date() - this.props.gameStart);
				this.setState({
					timeDisplay: timeDisplay
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ style: { display: "flex", justifyContent: "space-between" } },
				React.createElement(
					"div",
					null,
					this.state.timeDisplay
				),
				React.createElement(
					"div",
					null,
					this.props.levelName
				)
			);
		}
	}]);

	return Timer;
}(React.Component);

var MazeGameContainer = function (_React$Component2) {
	_inherits(MazeGameContainer, _React$Component2);

	function MazeGameContainer(props) {
		_classCallCheck(this, MazeGameContainer);

		return _possibleConstructorReturn(this, (MazeGameContainer.__proto__ || Object.getPrototypeOf(MazeGameContainer)).call(this, props));
	}

	_createClass(MazeGameContainer, [{
		key: "render",
		value: function render() {
			var _this3 = this;

			return React.createElement(
				"div",
				{ style: { display: "flex", justifyContent: "center" } },
				React.createElement(
					"div",
					{ className: "whitePanel" },
					React.createElement(
						"div",
						{ style: { textAlign: "center" } },
						"Dimensions"
					),
					React.createElement(
						"div",
						{ style: {
								display: "flex",
								justifyContent: "center",
								flexWrap: "wrap",
								minWidth: "350px"
							} },
						[].concat(_toConsumableArray(Array(this.props.mazeSize.length))).map(function (x, dimension) {
							return React.createElement(
								"div",
								{ key: dimension },
								React.createElement(Control, {
									dimensionIndex: dimension,
									areasOfDimension: getAreasOfDimension(_this3.props.maze, _this3.props.playerCoordinates, dimension),
									reversedPreviousAreasOfDimension: [].concat(_toConsumableArray(getAreasOfDimension(_this3.props.maze, _this3.props.previousPlayerCoordinates, dimension))).reverse(),
									moves: _this3.props.movesByDimension[dimension],
									onClickUp: function onClickUp() {
										return _this3.props.handleClickUp(dimension);
									},
									onClickDown: function onClickDown() {
										return _this3.props.handleClickDown(dimension);
									},
									movedUp: _this3.props.movedUp,
									dimensionMoved: _this3.props.dimensionMoved
								})
							);
						})
					),
					React.createElement(
						"div",
						null,
						React.createElement(Timer, {
							gameStart: this.props.gameStart,
							gameWon: this.props.gameWon,
							levelName: this.props.levelName
						})
					),
					React.createElement(
						"div",
						{ style: {
								display: this.props.gameWon ? "flex" : "none",
								flexDirection: "column"
							} },
						React.createElement(
							"div",
							null,
							"YOU WON! \uD83E\uDD73\uD83C\uDF89\uD83D\uDCAF\uD83C\uDF89\uD83E\uDD73\uD83E\uDD55\uD83E\uDD55\uD83E\uDD55"
						),
						React.createElement(
							"button",
							{ className: "button", onClick: this.props.nextLevelFunction,
								style: { display: this.props.levelName ? "block" : "none" } },
							"Next"
						)
					)
				)
			);
		}
	}]);

	return MazeGameContainer;
}(React.Component);

function padToDigits(num, digits) {
	return num.toString().padStart(digits, '0');
}

function convertMsToMinutesSeconds(milliseconds) {
	var minutes = Math.floor(milliseconds / 60000);
	var seconds = Math.round(milliseconds % 60000 / 1000);
	var millis = milliseconds % 1000;

	return padToDigits(minutes) + ":" + padToDigits(seconds, 2) + ":" + padToDigits(millis, 3);
}