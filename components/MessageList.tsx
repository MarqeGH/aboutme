import React from 'react';

interface Message {
  text: string;
  username: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {[...messages].map((message, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm w-full">
          <p className="break-words mb-2">{message.text}</p>
          <a 
            href={`https://x.com/${message.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            @{message.username}
          </a>
        </div>
      ))}
    </div>
  );
}