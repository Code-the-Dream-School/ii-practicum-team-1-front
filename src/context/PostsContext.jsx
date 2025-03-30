import React from "react";
import { createContext, useEffect, useState, useContext} from "react";
import dummyItems from "./dummyPosts.js";


const PostsContext = createContext();


function PostsProvider({ children }) {
 const [posts, setPosts] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [currentPost, setCurrentPost] = useState({});
 const [error, setError] = useState(null);


 console.log(dummyItems);


 useEffect(() => {
   fetchPosts();
 }, []);


 async function fetchPosts() {
   try {
     setIsLoading(true);
     setError(null);
     setPosts(dummyItems);
   } catch (err) {
     setError("Failed to fetch posts");
   } finally {
     setIsLoading(false);
   }
 }


 async function getPost(id) {
   try {
     setIsLoading(true);
     setError(null);
     const post = dummyItems.find(p => p.item_id === id);
     if (!post) throw new Error("Post not found");
     setCurrentPost(post);
   } catch (err) {
     setError(err.message);
   } finally {
     setIsLoading(false);
   }
 }


 async function updatePost(id, updatedData) {
   try {
     setIsLoading(true);
     setError(null);
     const updatedPost = { ...posts.find(p => p.item_id === id), ...updatedData };
     setPosts(prevPosts => prevPosts.map(post => post.item_id === id ? updatedPost : post));
     setCurrentPost(updatedPost);
   } catch (err) {
     setError("Failed to update post");
   } finally {
     setIsLoading(false);
   }
 }


 async function deletePost(id) {
   try {
     setIsLoading(true);
     setError(null);
     setPosts(prevPosts => prevPosts.filter(post => post.item_id !== id));
     if (currentPost.item_id === id) setCurrentPost({});
   } catch (err) {
     setError("Failed to delete post");
   } finally {
     setIsLoading(false);
   }
 }


 async function createPost(newPostData) {
   try {
     setIsLoading(true);
     setError(null);
     const newPost = { item_id: Date.now(), ...newPostData };
     setPosts(prevPosts => [...prevPosts, newPost]);
   } catch (err) {
     setError("Failed to create post");
   } finally {
     setIsLoading(false);
   }
 }


 return (
   <PostsContext.Provider value={{
     posts,
     isLoading,
     currentPost,
     error,
     getPost,
     updatePost,
     deletePost,
     createPost
   }}>
     {children}
   </PostsContext.Provider>
 );
}


function usePosts() {
 const context = useContext(PostsContext);
 if (context === undefined) {
   throw new Error("usePosts must be used within a PostsProvider");
 }
 return context;
}


export { PostsProvider, usePosts };