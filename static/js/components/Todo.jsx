class Todo extends React.Component {
  constructor(props) {
      super(props);
      this.state = this.props.item;

      // Bindings
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault();
    var listItemId = this.state.id;
    this.props.removeListItem(listItemId);
  }

  render () {
    var item = this.props.item;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          {item.name}
        </div>

        <p className="panel-body">{item.description}</p>

        <div className="panel-footer">
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-default btn-xs">Remove</button>
          </form>
        </div>
      </div>
    );
  }
}
