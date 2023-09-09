"use client";

import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { Context } from "@/components/Clients";

export default function AddTodoForm(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const {user} = useContext(Context);
    const router = useRouter();

    const handleAddNewTask = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch('/api/newtask',{
                method:"POST",
                body:JSON.stringify({
                    title,
                    description,
                }),
                headers:{
                    "Content-Type":"application/json",
                },
            });
            res = await res.json();
            // console.log(res);
            if(!res.success) return toast.error(res.message);
            toast.success(res.message);
            router.refresh();
            setTitle('');
            setDescription('');
        } catch (error) {
            toast.error(res.message);
        }
    }

    if(!user._id) return redirect('/login');

    return (
        <div className="login">
            <section>
                <form onSubmit={handleAddNewTask}>
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Task Title'/>
                    <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder='Task Description'/>
                    <button type="submit">Add Task</button>
                </form>
            </section>
        </div>
    );
}