import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
        file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("/upload",formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
            console.log(response);
        }).catch((error) => {
    });
}
onChange(e) {
    this.setState({file:e.target.files[0]});
}
  render() {
    return (
      <div className="App">
        <form method="post" encType="multipart/form-data" onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
