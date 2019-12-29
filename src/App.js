import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Menu = electron.remote.Menu;

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.initMenu();
    axios.get("https://reddit.com/r/aww.json")
      .then(response => {
        this.setState({
          posts: response.data.data.children
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  showImage = image => {
    ipcRenderer.send('toggle-image', image);
  }

  initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          { label: "New Window" },
          {
            label: "Settings",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-settings");
            }
          },
          { type: "separator" },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Menu Item 1" },
          { label: "Menu Item 2" },
          { label: "Menu Item 3" }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  }

  handleClick = (getData) => {
    this.props.history.push("/detailPage"
    , {
      myProp: getData,
    }
    );
    // console.log(this.props.history);
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post =>
            <li
              key={post.data.id}
              className="list-group-item flex-container" 
            >
              <img onClick={() => this.showImage(post.data.thumbnail)} src={post.data.thumbnail} alt="thumb" className="thumbnail" />
              <div onClick={() => this.handleClick(post.data.title)}>{post.data.title}</div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
