import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Footer from './Footer';
import { saveTodo, loadTodos, deleteTodo } from '../lib/service';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: '',
      todos: [],
    };
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then(({ data }) =>
        this.setState({
          todos: data,
        })
      )
      .catch(() => this.setState({ error: true }));
  }

  handleNewTodoChange(evt) {
    this.setState({ currentTodo: evt.target.value });
  }

  handleDelete(id) {
    deleteTodo(id).then(() =>
      this.setState({
        todos: this.state.todos.filter((t) => t.id !== id),
      })
    );
  }

  handleTodoSubmit(evt) {
    evt.preventDefault();
    const newTodo = { name: this.state.currentTodo, isCompleted: false };
    saveTodo(newTodo)
      .then(({ data }) =>
        this.setState({
          todos: this.state.todos.concat(data),
          currentTodo: '',
        })
      )
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const remaining = this.state.todos.filter(
      (todo) => !todo.isComplete
    ).length;
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className="error">Oh no!</span> : null}
            <TodoForm
              currentTodo={this.state.currentTodo}
              handleNewTodoChange={this.handleNewTodoChange}
              handleTodoSubmit={this.handleTodoSubmit}
            />
          </header>
          <section className="main">
            <TodoList
              todos={this.state.todos}
              handleDelete={this.handleDelete}
            />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    );
  }
}
