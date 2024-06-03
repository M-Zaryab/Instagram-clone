import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { searchPosts } from "@/lib/appwrite/api";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queryAndMutations";
import { useState } from "react";

const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const { data: searchPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounceValue);

  console.log("posts: ", posts);

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item?.documents.length === 0);

  if (!posts) {
    return (
      <div className="flex flex-center">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold">Search Post</h2>
        <div className="flex flex-1 gap-1 w-full rounded-lg px-4 bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="Search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="h3-bold md:h2-bold">Popular Today</h2>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small:medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of Post</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
