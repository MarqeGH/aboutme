'use server';

import { neon } from '@neondatabase/serverless';

export async function createComment(comment: string, twitterHandle: string) {
  try {
    console.log('Attempting to create comment:', { comment, twitterHandle });
    const sql = neon(process.env.DATABASE_URL!);
    console.log('Database connection established.');

    console.log('Updating user with twitter handle:', twitterHandle);
    await sql`
      UPDATE users 
      SET twitter_handle = ${twitterHandle}
    `;
    console.log('User update successful.');

    console.log('Inserting comment into database.');
    const result = await sql`
      INSERT INTO comments (content, username, created_at) 
      VALUES (${comment}, ${twitterHandle}, NOW())
      RETURNING *
    `;
    console.log('Comment insertion successful:', result);

    return { 
      success: true, 
      data: {
        text: result[0].content,  // Map 'content' back to 'text' for frontend compatibility
        username: result[0].username
      }
    };
  } catch (error: unknown) {
    console.error('Database error during comment creation:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to create comment' };
  }
} 

export async function getMessages() {
  try {
    console.log('Fetching messages from database.');
    const sql = neon(process.env.DATABASE_URL!);
    console.log('Database connection established.');

    const messages = await sql`
      SELECT content, username FROM comments
      ORDER BY created_at DESC
    `;
    console.log('Messages fetched successfully:', messages);

    return messages.map(msg => ({
      text: msg.content,
      username: msg.username
    }));
  } catch (error: unknown) {
    console.error('Database error during message retrieval:', error);
    return [];
  }
} 