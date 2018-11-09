class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // Bindings
        this.getListOfItemIds = this.getListOfItemIds.bind(this);
        this.getTotalNumberOfListItems = this.getTotalNumberOfListItems.bind(this);
        this.createListItemElements = this.createListItemElements.bind(this);
    }

  getListOfItemIds (items) {
    return Object.keys(items);
  }

  getTotalNumberOfListItems (items) {
    return Object.keys(items).length;
  }

  createListItemElements (items) {
    var item;

    return (
      this
      .getListOfItemIds(items)
      .map(function createListItemElement(itemId) {
        item = items[itemId];
        return (<Todo item={item} removeListItem={this.props.removeListItem} key={item.id} />);
      }.bind(this))
      .reverse()
    );
  }

  render () {
    var items = this.props.items;
    var listItemElements = this.createListItemElements(items);

    return (
      <div>
        <h3 className="page-header">

          <div>
              Total Tasks: {this.getTotalNumberOfListItems(items)}
          </div>

        </h3>
        <ul>

          {listItemElements.length > 0 ? listItemElements : <EmptyList />}

        </ul>
      </div>
    );
  }
}
