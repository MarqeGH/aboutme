'use client';

import { useState, useEffect, useRef } from 'react';
import { signOut, signIn, useSession } from 'next-auth/react';
import { createComment, getMessages } from '../actions';
import MessageMosaic from '../../components/MessageMosaic';
import Header from '../../components/header';

export default function Home() {

    const { data: session, status } = useSession();
    const [messages, setMessages] = useState<{ text: string, username: string }[]>([]);
    const commentInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
      async function fetchMessages() {
        const fetchedMessages = await getMessages();
        setMessages(fetchedMessages);
      }
      fetchMessages();
    }, []);
  
    async function create(formData: FormData) {
      const comment = formData.get('comment') as string;
      if (!comment?.trim()) return;
  
      try {
        const twitterHandle = session?.user?.username;
  
        const result = await createComment(comment, twitterHandle || 'anonymous');
        if (!result.success) {
          throw new Error(result.error);
        }
        setMessages(prev => [{ 
          text: result?.data?.text || '', 
          username: result?.data?.username || ''
        }, ...prev]);
  
        // Clear the input field
        if (commentInputRef.current) {
          commentInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    }
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
  
    return (
      <div className="p-8">
        <Header />
        {session ? (
          <div>
            <h2 className="text-xl mb-4">Welcome, {session.user.username}!</h2>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Sign out
            </button>
            <h3 className="text-lg mb-4 text-center">Leave a message!</h3>
            <form onSubmit={(e) => { e.preventDefault(); create(new FormData(e.currentTarget)); }} className="mb-4 flex justify-center items-center gap-2 max-w-lg mx-auto">
              <input
                type="text"
                name="comment"
                placeholder="Write a message"
                className="border p-2 rounded w-96 text-black"
                ref={commentInputRef}
              />
              <button type="submit" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button
              onClick={() => signIn('twitter')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Sign in with Twitter
            </button>
          </div>
        )}
        <MessageMosaic messages={messages} />
      </div>
    );
  }