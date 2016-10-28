var React = require("react");
var classNames = require("classnames");

module.exports = React.createClass({
  displayName: "TabSet",
  componentDidMount: function() {
    return typeof module.onReload === "function" ? module.onReload(() => {
      return window.previousTabSetState = this.state;
    }) : void 0;
  },
  getInitialState: function() {
    return window.previousTabSetState || {
      activeIndex: -1
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.state.activeIndex === -1 && nextProps.children.length > 0) {
      return this.setActiveIndex(0);
    }
  },
  setActiveIndex: function(index) {
    return this.setState({
      activeIndex: index
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": "tab-view"
    }, React.createElement("div", {
      "className": "tab-view-tab-set"
    }, React.Children.map(this.props.children, this.renderTab)), this.props.children[this.state.activeIndex]);
  },
  renderTab: function(tab, index) {
    return React.createElement("a", {
      "key": index,
      "onClick": (() => {
        return this.setActiveIndex(index);
      }),
      "className": classNames("tab-view-tab-set-tab", {
        active: this.state.activeIndex === index
      })
    }, tab.props.title);
  }
});
