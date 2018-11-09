var styleRequired = {
  color: "#ffaaaa"
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
    }

  handleSubmitEvent (event) {
    event.preventDefault();

    var item = {
      id: guid(),
      date: new Date(),
      name: this.refs.name.value.trim(),
      description: this.refs.description.value.trim()
    };

    this.props.addListItem(item);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmitEvent}>
        <h3 className="page-header">Add New Task</h3>

        <div className="form-group">
          <label htmlFor="listItemName">Name <span style={styleRequired}>*</span></label>
          <input type="text" className="form-control" id="listItemName" placeholder="Enter name" required ref="name" />
        </div>

        <div className="form-group">
          <label htmlFor="listItemDescription">Description</label>
          <textarea className="form-control" rows="3" id="listItemDescription" placeholder="Enter description" ref="description"></textarea>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col-xs-5 col-sm-6 col-md-4">
            </div>
          </div>
        </div>

        <hr />

        <button type="submit" className="btn btn-primary">Add to list</button>
        <button type="reset" className="btn btn-link">Cancel</button>
      </form>
    );
  }
}
