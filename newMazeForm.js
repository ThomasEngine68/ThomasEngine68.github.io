'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewMazeForm = function (_React$Component) {
	_inherits(NewMazeForm, _React$Component);

	function NewMazeForm(props) {
		_classCallCheck(this, NewMazeForm);

		var _this = _possibleConstructorReturn(this, (NewMazeForm.__proto__ || Object.getPrototypeOf(NewMazeForm)).call(this, props));

		_this.state = {
			dimensionCount: 1,
			mazeSize: [5],
			forceBackTrack: false,
			wallChance: 0.0,
			created: true,
			seed: parseInt(Math.random() * 10000)
		};

		_this.handleDimensionCountChange = _this.handleDimensionCountChange.bind(_this);
		_this.handleDimensionSizeChange = _this.handleDimensionSizeChange.bind(_this);
		_this.handleBackTrackChange = _this.handleBackTrackChange.bind(_this);
		_this.handleSeedChange = _this.handleSeedChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		_this.handleWallChanceChange = _this.handleWallChanceChange.bind(_this);
		_this.generateLevel = _this.generateLevel.bind(_this);
		_this.generateLevel1 = _this.generateLevel1.bind(_this);
		_this.generateLevel2 = _this.generateLevel2.bind(_this);
		_this.generateLevel3 = _this.generateLevel3.bind(_this);
		_this.generateLevel4 = _this.generateLevel4.bind(_this);
		_this.generateLevel5 = _this.generateLevel5.bind(_this);
		_this.generateLevel6 = _this.generateLevel6.bind(_this);
		_this.generateLevel7 = _this.generateLevel7.bind(_this);

		console.log(_this.state.created);
		return _this;
	}

	_createClass(NewMazeForm, [{
		key: "handleSubmit",
		value: function handleSubmit(event) {
			if (event) event.preventDefault();
			this.props.submitMazeSize(this.state.mazeSize, this.state.forceBackTrack, this.state.wallChance, this.state.seed);
		}
	}, {
		key: "handleBackTrackChange",
		value: function handleBackTrackChange(event) {
			this.setState({
				forceBackTrack: event.target.value == "true"
			});
		}
	}, {
		key: "handleWallChanceChange",
		value: function handleWallChanceChange(event) {
			var wallChance = parseFloat(event.target.value);
			this.setState({
				wallChance: wallChance
			});
		}
	}, {
		key: "handleDimensionSizeChange",
		value: function handleDimensionSizeChange(event) {
			event.preventDefault();
			var dimensionName = event.target.name;
			var dimension = parseInt(dimensionName.substring(dimensionName.length - 1));
			var dimensionValue = parseInt(event.target.value);
			var mazeSize = this.state.mazeSize;
			mazeSize[dimension] = dimensionValue;
			this.setState({
				mazeSize: mazeSize
			});
		}
	}, {
		key: "handleSeedChange",
		value: function handleSeedChange(event) {
			event.preventDefault();
			var seed = event.target.value;
			this.setState({
				seed: seed
			});
		}
	}, {
		key: "handleDimensionCountChange",
		value: function handleDimensionCountChange(event) {
			event.preventDefault();
			var dimensionCount = parseInt(event.target.value);
			if (dimensionCount <= 6 && dimensionCount >= 1) {
				var mazeSize = this.state.mazeSize;
				if (mazeSize.length < dimensionCount) {
					for (var i = mazeSize.length; i < dimensionCount; i++) {
						mazeSize.push(3);
					}
				} else if (mazeSize.length > dimensionCount) {
					mazeSize = mazeSize.slice(0, dimensionCount);
				}
				this.setState({
					dimensionCount: dimensionCount,
					mazeSize: mazeSize
				});
			}
		}
	}, {
		key: "generateLevel1",
		value: function generateLevel1() {
			this.generateLevel(1, [5], false, 0.0);
		}
	}, {
		key: "generateLevel2",
		value: function generateLevel2() {
			this.generateLevel(2, [6, 6], true, 0.55);
		}
	}, {
		key: "generateLevel3",
		value: function generateLevel3() {
			this.generateLevel(3, [5, 5, 5], true, 0.6);
		}
	}, {
		key: "generateLevel4",
		value: function generateLevel4() {
			this.generateLevel(4, [4, 4, 4, 4], true, 0.6);
		}
	}, {
		key: "generateLevel5",
		value: function generateLevel5() {
			this.generateLevel(5, [4, 4, 4, 4, 4], true, 0.7);
		}
	}, {
		key: "generateLevel6",
		value: function generateLevel6() {
			this.generateLevel(6, [4, 4, 4, 4, 3, 3], true, 0.75);
		}
	}, {
		key: "generateLevel7",
		value: function generateLevel7() {
			this.generateLevel(6, [5, 5, 4, 4, 4, 4], true, 0.77);
		}
	}, {
		key: "generateLevel",
		value: function generateLevel(dimensionCount, mazeSize, forceBackTrack, wallChance, seed) {
			var _this2 = this;

			if (!seed) seed = parseInt(Math.random() * 10000);
			this.setState({
				dimensionCount: dimensionCount,
				mazeSize: mazeSize,
				forceBackTrack: forceBackTrack,
				wallChance: wallChance,
				created: false,
				seed: seed
			}, function () {
				setTimeout(function () {
					_this2.handleSubmit();
					_this2.setState({ created: true });
				}, 100);
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var totalAreas = 1;
			this.state.mazeSize.forEach(function (size) {
				totalAreas = totalAreas * size;
			});
			return React.createElement(
				"div",
				{ className: "whitePanel" },
				React.createElement(
					"div",
					{ style: { display: "flex", flexWrap: "wrap" } },
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel1 },
						"Level 1"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel2 },
						"Level 2"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel3 },
						"Level 3"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel4 },
						"Level 4"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel5 },
						"Level 5"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel6 },
						"Level 6"
					),
					React.createElement(
						"button",
						{ className: "button", onClick: this.generateLevel7 },
						"Level 7"
					)
				),
				React.createElement(
					"form",
					{ onSubmit: this.handleSubmit },
					React.createElement(
						"div",
						{ style: { display: "flex" } },
						React.createElement(
							"h3",
							null,
							"Custom maze"
						),
						React.createElement(
							"h3",
							{ style: {
									visibility: this.state.created ? 'hidden' : 'initial',
									marginLeft: "10px"
								} },
							"Loading..."
						)
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							null,
							"Force back track"
						),
						React.createElement(
							"label",
							null,
							"On",
							React.createElement("input", { type: "radio", name: "forceBackTrack", value: "true", checked: this.state.forceBackTrack, onChange: this.handleBackTrackChange })
						),
						React.createElement(
							"label",
							null,
							"Off",
							React.createElement("input", { type: "radio", name: "forceBackTrack", value: "false", checked: !this.state.forceBackTrack, onChange: this.handleBackTrackChange })
						)
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"label",
							null,
							"Wall chance",
							React.createElement("input", { type: "number", step: "0.01", min: "0.00", max: "0.80", name: "wallChance", value: this.state.wallChance, onChange: this.handleWallChanceChange })
						)
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							null,
							"Dimension count (1 - 6)"
						),
						React.createElement("input", { type: "number", min: "1", max: "6", name: "dimensionCount", value: this.state.dimensionCount, onChange: this.handleDimensionCountChange })
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							null,
							"Size per dimension"
						),
						[].concat(_toConsumableArray(Array(this.state.dimensionCount))).map(function (x, dimension) {
							return React.createElement(
								"div",
								{ key: dimension },
								React.createElement(
									"label",
									null,
									"Dimension ",
									dimension,
									React.createElement("input", { type: "number", min: "2", max: "10", value: _this3.state.mazeSize[dimension], name: "dimensionSize" + dimension, onChange: _this3.handleDimensionSizeChange })
								)
							);
						})
					),
					React.createElement(
						"p",
						null,
						"Total areas: ",
						totalAreas
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							null,
							"Map generation seed"
						),
						React.createElement("input", { type: "number", min: "1", max: "1000000", step: "1", name: "seed", value: this.state.seed, onChange: this.handleSeedChange })
					),
					React.createElement(
						"button",
						{ className: "button", type: "submit" },
						"Create a new maze!"
					)
				)
			);
		}
	}]);

	return NewMazeForm;
}(React.Component);