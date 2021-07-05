import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      age: "",
      country: ""
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <div className="nav-bg">AWS Global Summit 2021 Training Program😍</div>
        <center>
          <div className="web-form">
            <div className="form-head">
              Hurry Up Register Now, Only Few seats left!🚀
            </div>
            <div className="form-body">
              <form method="post" action="http://backend_pulic_ip:port">
                <div className="name">
                  <label htmlFor="name">Enter Name:</label>
                  <input
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Enter E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="age">
                  <label htmlFor="age">Enter Age:</label>
                  <input
                    type="text"
                    name="age"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="mobile">
                  <label htmlFor="mobile">Enter Mobile:</label>
                  <input
                    type="text"
                    name="mobile"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="country">
                  <label htmlFor="country">Enter country</label>
                  <input
                    type="text"
                    name="country"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="photo">
                  <label htmlFor="photo">Upload Image</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="submit">
                  <input type="submit" />
                  <input type="reset" />
                </div>
              </form>
            </div>
          </div>
        </center>
      </div>
    );
  }
}
export default App;
