import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';

const AddTodo = ({ dispatch }) => {
  let input

  const submit = async e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    // Mutation
    const todoDetails = {
      id: Math.trunc(Math.random()*100), 
      name: 'input.value',
      description: 'TODO all over'
    };

    const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
    console.log(newTodo);
    dispatch(addTodo(input.value))
    input.value = ''
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
