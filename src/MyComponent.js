import React from 'react';
import $ from 'jquery';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:5000/items",
      method: "get"
    }).done((json_result)=>{
      this.setState((state)=>{
        return { items: json_result.items, isLoaded: true };
      });
    }).fail((error)=>{
      console.log(error);
      this.setState((state)=>{
        return { isLoaded: true, error: true };
      });
    })
  }

  render() {
    let error = this.state.error;
    let isLoaded = this.state.isLoaded;
    let items = this.state.items;

    if (error) {
      return <div>Error: Failed to load data</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default MyComponent;