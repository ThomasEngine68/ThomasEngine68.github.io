'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageContainer = function (_React$Component) {
	_inherits(PageContainer, _React$Component);

	function PageContainer(props) {
		_classCallCheck(this, PageContainer);

		var _this = _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).call(this, props));

		var mazeSize = [5];
		var maze = createPlayableMaze(mazeSize, 0.0, false);
		var playerCoordinates = [0];
		var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
		_this.state = {
			mazeSize: mazeSize,
			maze: maze,
			playerCoordinates: playerCoordinates,
			movesByDimension: movesByDimension,
			playableMaze: true,
			gameWon: false,
			gameStart: new Date(),
			previousArea: null,
			movedUp: true,
			dimensionMoved: -1
		};
		_this.createNewMaze = _this.createNewMaze.bind(_this);
		_this.handleMove = _this.handleMove.bind(_this);
		_this.handleClickUp = _this.handleClickUp.bind(_this);
		_this.handleClickDown = _this.handleClickDown.bind(_this);
		_this.validMove = _this.validMove.bind(_this);
		addMoveKeybinds(_this.handleMove);
		return _this;
	}

	_createClass(PageContainer, [{
		key: "createNewMaze",
		value: function createNewMaze(mazeSize, forceBackTrack, wallChance, seed) {
			var playerCoordinates = [];
			mazeSize.forEach(function (size) {
				playerCoordinates.push(0);
			});
			var maze = createPlayableMaze(mazeSize, wallChance, forceBackTrack, seed);
			if (maze != null) {
				var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
				this.setState({
					mazeSize: mazeSize,
					maze: maze,
					playerCoordinates: playerCoordinates,
					movesByDimension: movesByDimension,
					playableMaze: true,
					gameWon: false,
					gameStart: new Date()
				});
			} else {
				this.setState({
					playableMaze: false,
					gameWon: false
				});
			}
		}
	}, {
		key: "handleMove",
		value: function handleMove(dimension, up) {
			if (!this.validMove(dimension, up)) return;
			var mazeSize = this.state.mazeSize.slice();
			var maze = this.state.maze.slice();
			var playerCoordinates = [].concat(_toConsumableArray(this.state.playerCoordinates));
			var previousArea = getAreaOfCoordinates(maze, playerCoordinates);
			previousArea.player = false;
			previousArea.hadPlayer = true;
			if (up) playerCoordinates[dimension]++;else playerCoordinates[dimension]--;
			var newArea = getAreaOfCoordinates(maze, playerCoordinates);
			newArea.player = true;
			var gameWon = newArea.goal;

			if (this.state.previousArea) this.state.previousArea.hadPlayer = false;
			var movesByDimension = getLegalMovesByDimension(playerCoordinates, maze);
			this.setState({
				mazeSize: mazeSize,
				maze: maze,
				playerCoordinates: playerCoordinates,
				movesByDimension: movesByDimension,
				gameWon: gameWon,
				previousArea: previousArea,
				movedUp: up,
				dimensionMoved: dimension
			});
		}
	}, {
		key: "validMove",
		value: function validMove(dimension, up) {
			if (this.state.gameWon) return false;
			if (dimension >= this.state.mazeSize.length) return false;
			var legalMoves = getLegalMovesByDimension(this.state.playerCoordinates, this.state.maze);
			var dimensionMoves = legalMoves[dimension];
			if (up) return dimensionMoves.validUp;else return dimensionMoves.validDown;
		}
	}, {
		key: "handleClickUp",
		value: function handleClickUp(dimension) {
			this.handleMove(dimension, true);
		}
	}, {
		key: "handleClickDown",
		value: function handleClickDown(dimension) {
			this.handleMove(dimension, false);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					{ style: { textAlign: "center" } },
					"Welcome to the Maze Game!"
				),
				React.createElement(MazeGameContainer, {
					handleClickUp: this.handleClickUp,
					handleClickDown: this.handleClickDown,
					mazeSize: this.state.mazeSize,
					maze: this.state.maze,
					playerCoordinates: this.state.playerCoordinates,
					movesByDimension: this.state.movesByDimension,
					gameWon: this.state.gameWon,
					gameStart: this.state.gameStart,
					movedUp: this.state.movedUp,
					dimensionMoved: this.state.dimensionMoved
				}),
				React.createElement(NewMazeForm, {
					submitMazeSize: this.createNewMaze
				}),
				this.state.playableMaze ? null : "COULDNT GENERATE PLAYABLE MAP"
			);
		}
	}]);

	return PageContainer;
}(React.Component);

var domContainer = document.querySelector('#pageContainer');
ReactDOM.render(React.createElement(PageContainer, null), domContainer);

function addMoveKeybinds(moveFunction) {
	document.onkeydown = function (e) {
		e = e || window.event;
		switch (e.key) {
			case 'q':
				moveFunction(0, true);break;
			case 'a':
				moveFunction(0, false);break;
			case 'w':
				moveFunction(1, true);break;
			case 's':
				moveFunction(1, false);break;
			case 'e':
				moveFunction(2, true);break;
			case 'd':
				moveFunction(2, false);break;
			case 'r':
				moveFunction(3, true);break;
			case 'f':
				moveFunction(3, false);break;
			case 't':
				moveFunction(4, true);break;
			case 'g':
				moveFunction(4, false);break;
			case 'y':
				moveFunction(5, true);break;
			case 'h':
				moveFunction(5, false);break;
		}
	};
}
