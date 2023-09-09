import React, { Suspense } from "react";
import AddTodoForm from "./addTodoForm";
import Todos from "./todos";

// here we are using server side rendering so component can be a async function
const Home = async () => {
  return (
    <div className="container">
        <AddTodoForm/>
        <Suspense fallback={<div> loading... </div>}>
          <Todos/>
        </Suspense>
    </div>
  )
}

export default Home;