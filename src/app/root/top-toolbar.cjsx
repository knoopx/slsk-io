React = require("react")

UI = require("../../ui")
{Toolbar} = UI
{Button} = UI.Buttons
{Row, Column, Divider, Gutter} = UI.Layout

module.exports = React.createClass
  displayName: "TopToolbar"
  propTypes:
    isConnected: React.PropTypes.bool

  render: ->
    <Toolbar>
      <Column>
        <div className="input-group">
          <i className="fa fa-search" />
          <Gutter/>
          <input placeholder="Search" onKeyDown={@onKeyDown}/>
        </div>
      </Column>
      <Gutter size={15}/>
      <Button>{if @props.isConnected then "Connected" else "Disconnected"}</Button>
      <Gutter size={5}/>
      <Button><i className="fa fa-cog" /></Button>
    </Toolbar>

  onKeyDown: (e) ->
    unless e.defaultPrevented
      switch e.key
        when "Enter"
          @props.onSearch(e.target.value)
          e.target.value = ""
          e.preventDefault()
