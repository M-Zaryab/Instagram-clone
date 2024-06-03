import PostCard from "@/components/shared/PostCard";
import PostCard2 from "@/components/shared/PostCard2";
import { useGetRecentPost } from "@/lib/react-query/queryAndMutations";
import { ID, Models } from "appwrite";
import { Loader } from "lucide-react";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPost();

  console.log("recent Post: ", posts);

  return (
    <div className=" flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <>
                  <PostCard post={post} key={post.$id} />
                </>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
