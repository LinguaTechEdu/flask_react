class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: ''
    };
    this.styleRequired = { color: "#ffaaaa" };
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
  }

  handleSubmitEvent (event) {
    event.preventDefault();
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state)
      };
      fetch('http://localhost:4000/api/v1/todos', requestOptions)
          .then(response => response.json())
          .then(data => this.props.addListItem(data));
  }

  handleChange(evt) {
    this.setState({
        [evt.target.name]: evt.target.value
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmitEvent}>
        <h3 className="page-header">Add New Task</h3>

        <div className="form-group">
          <label htmlFor="listItemName">Name <span style={this.styleRequired}>*</span></label>
          <input type="text" className="form-control" id="listItemName"
                 placeholder="Enter name" required name="name"
                 onChange={ evt => this.handleChange(evt)}/>
        </div>

        <div className="form-group">
          <label htmlFor="listItemDescription">Description</label>
          <textarea className="form-control" rows="3" id="listItemDescription"
                    placeholder="Enter description" name="description"
                    onChange={evt => this.handleChange(evt)} />
        </div>

        <hr />

        <button type="submit" className="btn btn-primary">Add to list</button>
        <button type="reset" className="btn btn-link">Cancel</button>
      </form>
    );
  }
}
