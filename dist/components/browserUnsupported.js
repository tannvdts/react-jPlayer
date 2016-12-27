(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../util/constants"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../util/constants"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.constants);
        global.browserUnsupported = mod.exports;
    }
})(this, function (exports, _react, _constants) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

            _this.state = _defineProperty({}, _constants.keys.NO_SOLUTION_CLASS, [_constants.classNames.NO_SOLUTION]);
            return _this;
        }

        _createClass(_class, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // If html is not being used by this browser, then media playback is not possible. Trigger an error event.
                // if(!this.html.used) {
                // 	this._error({
                // 		type: constants.errors.NO_SOLUTION,
                // 		context: "{solution:'" + this.props.solution + "', supplied:'" + this.props.supplied.join(", ") + "'}",
                // 		message: constants.errorMessages.NO_SOLUTION,
                // 		hint: constants.errorHints.NO_SOLUTION
                // 	});
                // 	this.setState(state => removeFromArrayByValue(state, jPlayerActions.removeFromArrayByValue(constants.keys.NO_SOLUTION_CLASS, constants.classNames.HIDDEN);
                // } else {
                // 	this.setState(state => addUniqueToArray(state, jPlayerActions.addUniqueToArray(constants.keys.NO_SOLUTION_CLASS, this.props[constants.keys.NO_SOLUTION_CLASS], constants.classNames.HIDDEN);
                // }
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    "div",
                    { className: this.state.noSolutionClass.join(" ") },
                    this.props.children
                );
            }
        }], [{
            key: "propTypes",
            get: function get() {
                return {
                    noSolutionClass: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)
                };
            }
        }]);

        return _class;
    }(_react2.default.Component);

    exports.default = _class;
});