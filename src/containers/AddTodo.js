import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../graphql/mutations';


let myAppConfig = {
  aws_appsync_graphqlEndpoint:
      'https://7sonzasi4nhgvdvxvzetrh5hhi.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-kxsttu7eynft5chxs476a75xuq'
};

Amplify.configure(myAppConfig);

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
      name: input.value,
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
