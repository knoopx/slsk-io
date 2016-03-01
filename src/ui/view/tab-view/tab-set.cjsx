React = require("react")
classNames = require("classnames")

module.exports = React.createClass
  displayName: "TabSet"

  componentDidMount: ->
    module.onReload? => window.previousTabSetState = @state

  getInitialState: ->
    window.previousTabSetState || activeIndex: -1

  componentWillReceiveProps: (nextProps) ->
    @setActiveIndex(0) if @state.activeIndex == -1 && nextProps.children.length > 0

  setActiveIndex: (index) ->
    @setState(activeIndex: index)

  render: ->
    <div className="tab-view">
      <div className="tab-view-tab-set">
        {React.Children.map @props.children, @renderTab}
      </div>
      {@props.children[@state.activeIndex]}
    </div>

  renderTab: (tab, index) ->
    <a key={index} onClick={=> @setActiveIndex(index)} className={classNames("tab-view-tab-set-tab", active: @state.activeIndex == index)}>
      {tab.props.title}
    </a>
