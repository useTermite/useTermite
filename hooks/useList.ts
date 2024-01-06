import { useState } from 'react';
import LinkedList from '../lib/linked-list';

// Initialize a new LinkedList
const list = new LinkedList();

// Define the custom hook
const useList = () => {
  // Use a state variable to manage the list data
  const [data, setData] = useState<Array<any>>(list.toArray());

  // Helper function to update data state
  const setListToState = () => {
    setData([...list.toArray()]); // Create a new array to trigger a state update
  };

  // Define the append function with strong typing
  const append = <T>(value: T) => {
    list.append(value);
    setListToState();
  };

  // Define the pop function
  const pop = () => {
    list.pop();
    setListToState();
  };

  // Define the clear function
  const clear = () => {
    list.clear();
    setData([]); // Clear the data state
  };

  // Define the deleteItem function with strong typing
  const deleteItem = <T>(value: T) => {
    list.delete(value);
    setListToState();
  };

  // Define the insertAfter function with strong typing
  const insertAfter = <K, T>(targetElement: K, value: T) => {
    list.insertAfter(value, targetElement);
    setListToState();
  };

  // Define the shift function
  const shift = () => {
    list.shift();
    setListToState();
  };

  // Define the prepend function with strong typing
  const prepend = <T>(value: T) => {
    list.prepend(value);
    setListToState();
  };

  return {
    append,
    pop,
    clear,
    deleteItem,
    insertAfter,
    shift,
    prepend,
    size: data.length,
    list: data
  };
};

export default useList;
