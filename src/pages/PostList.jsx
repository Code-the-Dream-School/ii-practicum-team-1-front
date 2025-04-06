import React from "react";
import { usePosts } from "../context/PostsContext";


const PostList = () => {
 const { posts, isLoading, error } = usePosts();


 if (isLoading) return <p className="text-center py-8">Loading posts...</p>;
 if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;
 if (posts.length === 0) return <p className="text-center py-8">No posts available.</p>;


 return (
   <div className="container mx-auto px-4 py-8">
     <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
       {posts.map((post) => (
         <div
           key={post.item_id}
           className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
         >
           {/* Photo Gallery Section */}
           <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50">
             {Array.isArray(post.photos) ? (
               post.photos.map((photo, index) => (
                 <div key={index} className={`${post.photos.length === 1 ? "col-span-2" : "col-span-1"} aspect-square`}>
                   <img
                     src={photo}
                     alt={`Post ${post.item_id} - Photo ${index + 1}`}
                     className="w-full h-full object-cover rounded-lg"
                     loading="lazy"
                   />
                 </div>
               ))
             ) : (
               <div className="col-span-2 aspect-square">
                 <img
                   src={post.photo}
                   alt={`Post ${post.item_id}`}
                   className="w-full h-full object-cover rounded-lg"
                   loading="lazy"
                 />
               </div>
             )}
           </div>


           {/* Post Details */}
           <div className="p-4">
            
             <h2 className="text-l font-semibold mb-2">{post.title}</h2>


           </div>
         </div>
       ))}
     </div>
   </div>
 );
};


export default PostList;