"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Context = createContext({user:{}});

export const ContextProvider = ({ children }) => {
    const [user,setUser] = useState({});

    useEffect(()=>{
        fetch('/api/auth/profile')
        .then((res)=>res.json())
        .then((resp)=>{
            if(resp.success) setUser(resp.user);
        });
    },[])

    return (
        <Context.Provider value={{user,setUser}}>
            { children }
            <Toaster/>
        </Context.Provider>
    );
}

export const LogoutBtn = () => {
    const { user,setUser } = useContext(Context);

    const logoutHandler = async () => {
        try {
            let res = await fetch('/api/auth/logout');
            res = await res.json();
            if(!res.success) toast.error(res.message);
            setUser({});
            toast.success(res.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return(
        <>
            {
                user._id?(<button className="btn" onClick={logoutHandler}>Logout</button>):(<Link href={"/login"}>Login</Link>)
            }    
        </>
    );
}

export const TodoBtn = ({id,completed}) => {
    const router = useRouter();

    const deleteHandler = async (id) => {
        try {
            let res = await fetch(`/api/task/${id}`,{
                method:"DELETE",
            });
            res = await res.json();
            if(!res.success) return toast.error(res.message);
            toast.success(res.message);
            router.refresh();
        } catch (error) {
            return toast.error(error.message);
        }
    }

    const updateHandler = async (id) => {
        try {
            let res = await fetch(`/api/task/${id}`,{
                method:"PUT",
            });
            res = await res.json();
            if(!res.success) return toast.error(res.message);
            toast.success(res.message);
            router.refresh();
        } catch (error) {
            return toast.error(error.message);
        }
    }

    return(
        <>
            <input type="checkbox" checked={completed} onChange={()=>updateHandler(id)}/>
            <button className="btn" onClick={()=>deleteHandler(id)}>Delete</button>
        </>
    );
}