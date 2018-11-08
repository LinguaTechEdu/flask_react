class ShoppingList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {}
    };

    // ES6: Without binding 'this' here, it will get lost in local scope!
    this.addListItem = this.addListItem.bind(this);
    this.updateList = this.updateList.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.removeAllListItems = this.removeAllListItems.bind(this)
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
    var list = this.state.list;

    delete list[itemId];

    this.updateList(list);
  }

  removeAllListItems() {
    this.updateList({});
  }

  render() {
    var items = this.state.list;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">

            <List
              items={items}
              removeListItem={this.removeListItem}
              removeAllListItems={this.removeAllListItems} />

          </div>
          <div className="col-sm-6">

            <TodoForm addListItem={this.addListItem} />

          </div>
        </div>
      </div>
    );
  }
}
