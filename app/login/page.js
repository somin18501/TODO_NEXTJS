"use client";

import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';

export default function Page(){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {user,setUser} = useContext(Context);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('/api/auth/login',{
        method:"POST",
        body:JSON.stringify({
          email,
          password,
        }),
        headers:{
          "Content-Type":"application/json",
        },
      });
      res = await res.json();
      // console.log(res);
      if(!res.success) return toast.error(res.message);
      setUser(res.user);
      toast.success(res.message);
    } catch (error) {
      toast.error(res.message);
    }
  }

  if(user._id) return redirect('/');

  return (
    <div className='login'>
        <section>
            <form onSubmit={handleLogin}>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='abc@exmple.com'/>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='atleast 8 character'/>
                <button type="submit">Login</button>
                <p>OR</p>
                <Link href={'/register'}>New User</Link>
            </form>
        </section>
    </div>
  );
};

export const metadata = {
    title: 'Login',
    description: 'This is a Login page of Todo App',
}
