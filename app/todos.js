import React from 'react'
import { TodoItem } from "@/components/Server";
import { cookies } from "next/headers";

const fetchTodo = async (token) => {
    try {
      let res = await fetch(`${process.env.URL}/api/mytask`,{
        cache:"no-cache",
        headers:{
          cookie:`token=${token}`,
        },
      });
  
      res = await res.json();
  
      if(!res.success) return [];
  
      return res.tasks;
    } catch (error) {
      return [];
    }
  }  

const Todos = async () => {
    const token = cookies().get("token")?.value;
    const tasks = await fetchTodo(token);

  return (
    <section className="todosContainer">
        { // if curly brackets used in map then return key word must be used
            tasks?.map((i)=>
                <TodoItem title={i.title} description={i.description} key={i._id} id={i._id} completed={i.isCompleted}/>
            )
        }
    </section>
  )
}

export default Todos