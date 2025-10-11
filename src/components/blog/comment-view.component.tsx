import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Comment } from "@/lib/types/types";
import { fetchComments } from "@/lib/utils";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface CommentSectionProps {
  postId: string;
  collectionName: string;
}
export default function CommentView({
  postId,
  collectionName,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      const { comments: initialComments, lastVisibleDoc } = await fetchComments(
        postId,
        10,
        lastDoc,
        collectionName
      );
      setComments(initialComments as Comment[]);
      setLastDoc(lastVisibleDoc);
      setLoading(false);
    };

    loadComments();
  }, [postId]);

  //   const loadMoreComments = async () => {
  //     if (lastDoc) {
  //       const { comments: newComments, lastVisibleDoc } =
  //         await fetchCommentsForPost(postId);
  //       setComments((prevComments) => [...prevComments, ...newComments]);
  //       setLastDoc(lastVisibleDoc);
  //     }
  //   };
  return (
    <>
      <h1 className="text-2xl font-bold">Comments</h1>
      {loading && (
        <div className="flex justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mt-4">
            <div className="space-y-1 flex gap-3">
              <Avatar>
                <AvatarFallback>
                  {comment.fullName.substring(0, 1).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h6 className="font-semibold">{comment.fullName}</h6>
                <span className="text-sm text-muted-foreground">
                  {comment.email}
                </span>
                <p className="text-sm text-muted-foreground">
                  {comment.comment}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
