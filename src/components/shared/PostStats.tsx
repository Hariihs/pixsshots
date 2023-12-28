import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations"
import { checkIsLiked } from "@/lib/utils"
import { Models } from "appwrite"
import React, { useState, useEffect } from "react"
import Loader from "./Loader"

type PostStatsProps = {
  post: Models.Document,
  userId: string
}

const PostStats = ({ post, userId }: PostStatsProps) => {  

  const likesList = post.likes.map((user: Models.Document) => user.$id ) 

  const [likes, setLikes] = useState(likesList) 
  const [isSaved, setIsSaved] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost() 

  const { data: currentUser } = useGetCurrentUser()  

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  ); 

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false)
  }, [currentUser])

  const handleLikePost =(e:React.MouseEvent<HTMLImageElement,MouseEvent>) => {
      
    e.stopPropagation();
  
    let likesArray = [...likes];
  
    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }
  
    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  } 

  const handleSavePost =(e:React.MouseEvent<HTMLImageElement,MouseEvent>) => {
    e.stopPropagation(); 
  
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id); 
    }else{
      savePost({ userId: userId, postId: post.$id });
      setIsSaved(true);
    } 
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-1.5 items-center mr-5">
        <img 
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt='likebutton' 
          width={23} height={23}
          onClick={handleLikePost}
          className="cursor-pointer"
        /> 
        <p className="text-lg">{likes.length}</p>
      </div> 

      <div className="flex items-center gap-1.5">
        {isSavingPost || isDeletingSaved 
        ? <Loader /> 
        : <img 
          src={isSaved 
            ? "/assets/icons/saved.svg" 
            : "/assets/icons/save.svg"
          }
          alt='likebutton' 
          width={21} height={21}
          onClick={handleSavePost}
          className="cursor-pointer"
        />}
      </div>
    </div>
  )
}

export default PostStats
