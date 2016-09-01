/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp */
/* global localStorage */

import React from 'react';
import axios from 'axios';

export default class Exercise extends React.Component {
  constructor(props) {
    super(props);
    const authorization = localStorage.getItem('token');
    this.state = { authorization, exercises: [] };
    this.refresh = this.refresh.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get('http://localhost:9001/api/exercises', { headers: { authorization: this.state.authorization } })
    .then(res => {
      console.log("res is ", res.data);
      console.log("stateis", this.state);
      this.setState({ exercises: res.data });
    });
  }

  create(e) {
    e.preventDefault();
    const exercise = this.refs.exercise.value;
    const calories = this.refs.calories.value;
    const quantity = this.refs.quantity.value;
    const duration = this.refs.duration.value;
    axios.put('http://localhost:9001/api/exercises/addexercise', { exercise, calories, quantity, duration }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      this.refresh();
    });
  }

  render() {
    return (
      <div>

        <h1>Exercise</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="exercise">Exercise</label>
                <input ref="exercise" type="text" className="form-control" id="exercise" />
              </div>

              <div className="form-group">
                <label htmlFor="calories">Calories</label>
                <input ref="calories" type="text" className="form-control" id="calories" />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input ref="quantity" type="text" className="form-control" id="quantity" />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input ref="duration" type="text" className="form-control" id="duration" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Calories</th>
                  <th>Quantity</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                  { this.state.exercises.map(e => (
                    <tr key={e.id}>
                      <td>{e.exercise}</td>
                      <td>{e.calories}</td>
                      <td>{e.quantity}</td>
                      <td>{e.duration}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }
}
