class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {}
    };

    // ES6: Without binding 'this' here, it will get lost in local scope!
    this.createListItemElements = this.createListItemElements.bind(this);
    this.getListOfItemIds = this.getListOfItemIds.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.updateList = this.updateList.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.removeAllListItems = this.removeAllListItems.bind(this);
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:4000/api/v1/todos', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ list: data }));
  }

  updateList(newList) {
    this.setState({
      list: newList
    });
  }

  addListItem(item) {
    var list = this.state.list;
    list[item.id] = item;
    this.updateList(list);
  }

  removeListItem(itemId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId })
    };
    fetch('http://localhost:4000/api/v1/todos', requestOptions)
        .then(response => response)
        .then(data => {
          var list = this.state.list;
          delete list[itemId];
          this.updateList(list);
        });
  }

  removeAllListItems() {
    this.updateList({});
  }

  getListOfItemIds (items) {
    return Object.keys(items);
  }

  createListItemElements () {
    const { list } = this.state;
    const todoIds = this.getListOfItemIds(list);

    return (
            todoIds.map((todoId) => {
              let todo = list[todoId];
              return (<Todo item={todo} removeListItem={this.removeListItem} key={todo.id} />);
            }).reverse() // Display newest item in list first!
    );
  }

  render() {
    let todoElements = this.createListItemElements();

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <h3 className="page-header">
              <div>
                Total Tasks: {todoElements.length}
              </div>
            </h3>
            <ul>
              { todoElements.length > 0 ? todoElements : <EmptyList /> }
            </ul>
          </div>

          <div className="col-sm-6">
            <TodoForm addListItem={this.addListItem} />
          </div>
        </div>
      </div>
    );
  }
}
