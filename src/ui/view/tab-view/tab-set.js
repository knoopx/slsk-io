import React from "react";
import classNames from "classnames";

export default React.createClass({
  displayName: "TabSet",

  componentDidMount() {
    return typeof module.onReload === "function" ? module.onReload(() => {
      return window.previousTabSetState = this.state;
    }) : void 0;
  },

  getInitialState() {
    return window.previousTabSetState || {
      activeIndex: -1,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.activeIndex === -1 && nextProps.children.length > 0) {
      return this.setActiveIndex(0);
    }
  },

  setActiveIndex(index) {
    return this.setState({
      activeIndex: index,
    });
  },

  render() {
    return React.createElement(
      "div",
      {
        "className": "tab-view",
      },
      React.createElement(
        "div",
        {
          "className": "tab-view-tab-set",
        },
        React.Children.map(this.props.children, this.renderTab),
      ),
      this.props.children[this.state.activeIndex],
    );
  },

  renderTab(tab, index) {
    return React.createElement(
      "a",
      {
        "key": index,

        "onClick": (() => {
          return this.setActiveIndex(index);
        }),

        "className": classNames(
          "tab-view-tab-set-tab",
          {
            active: this.state.activeIndex === index,
          },
        ),
      },
      tab.props.title,
    );
  },
});
