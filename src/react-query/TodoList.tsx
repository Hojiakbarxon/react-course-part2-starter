import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  const fetchTodo = () =>
    axios
      .get<Todo[]>("https://jxsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data: todos, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodo,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

// Benefits - auto retry,  automatic refresh after a period of time, caching - first time we fetch the data it is stored in the cache, next time we need the same piece of data and it is still in cache we do not have to go to server
