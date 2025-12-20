import { ChevronDown, MoreVertical, Send, User, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CustomButton from "../../shared/CustomButton";
import { usePost } from "../../../hooks/usePost";
import useFetch from "../../../hooks/useFetch";
import type { Comment, User as UserType } from "../../../types";
import { format } from "date-fns";
import { clientApi } from "../../../api/clientApi";
import { useParams } from "react-router";

const COMMENTS_PER_PAGE = 5;

interface CommentsResponse {
    comments: Comment[];
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
    limit: number;
}

const Comments = ({ taskId }: { taskId: string }) => {
    const [newComment, setNewComment] = useState("");
    const [optimisticComments, setOptimisticComments] = useState<Comment[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { data: user } = useFetch("/users/me");
    const { projectId } = useParams();

    // React Query Infinite Query
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<CommentsResponse>({
        queryKey: [`/projects/columns/tasks/comments/${taskId}`],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await clientApi.get(
                `/projects/columns/tasks/comments/${taskId}?limit=${COMMENTS_PER_PAGE}&page=${pageParam}`
            );
            return response.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.page + 1 : undefined;
        },
    });

    const { mutate: addComment, isPending: isAdding } = usePost(
        `/projects/columns/tasks/comments`
    );

    // Flatten all pages of comments
    const allComments = data?.pages?.flatMap((page) => page.comments) || [];
    const totalComments = data?.pages[0]?.total || 0;
    const currentPage = data?.pages[data.pages.length - 1]?.page || 1;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                200
            )}px`;
        }
    }, [newComment]);

    const handleAddComment = () => {
        if (!newComment.trim() || !user) return;

        const optimisticComment: Comment = {
            id: `temp-${Date.now()}`,
            content: newComment,
            authorId: user.id,
            author: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },

            createdAt: new Date(),
            updatedAt: new Date(),
            isOptimistic: true,
        };

        setOptimisticComments((prev) => [...prev, optimisticComment]);
        setNewComment("");

        addComment(
            {
                taskId,
                authorId: user.id,
                content: newComment,
                projectId: projectId,
            },
            {
                onSuccess: (createdComment) => {
                    setOptimisticComments((prev) =>
                        prev.filter((c) => c.id !== optimisticComment.id)
                    );

                    // Refetch first page to include the new comment
                    refetch();
                },
                onError: () => {
                    setOptimisticComments((prev) =>
                        prev.filter((c) => c.id !== optimisticComment.id)
                    );
                },
            }
        );
    };

    const loadMoreComments = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !isAdding) {
            e.preventDefault();
            handleAddComment();
        }
    };

    // Combine and sort comments (newest first)
    const displayedComments = [...optimisticComments, ...allComments].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Calculate remaining comments
    const loadedCommentsCount = allComments.length + optimisticComments.length;
    const remainingComments = totalComments - loadedCommentsCount;

    if (isLoading && allComments.length === 0) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Add Comment Section */}

            <div className="mb-8 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                user?.name?.charAt(0).toUpperCase() || (
                                    <User className="w-5 h-5" />
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <textarea
                            ref={textareaRef}
                            value={newComment}
                            onChange={(e) => {
                                if (e.target.value.length <= 500) {
                                    setNewComment(e.target.value);
                                }
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a comment... (Ctrl+Enter to send)"
                            className="w-full min-h-[60px] max-h-[200px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={1}
                        />
                        <div className="flex justify-between items-center mt-3">
                            <span
                                className={`text-xs ${
                                    newComment.length >= 450
                                        ? "text-amber-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {newComment.length}/500 characters
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setNewComment("")}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                    disabled={!newComment.trim() || isAdding}
                                >
                                    Cancel
                                </button>
                                <CustomButton
                                    disabled={!newComment.trim() || isAdding}
                                    label={
                                        isAdding ? "Posting..." : "Post Comment"
                                    }
                                    Icon={isAdding ? Loader2 : Send}
                                    onClick={handleAddComment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {displayedComments.length === 0 ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No comments yet
                        </h3>
                        <p className="text-gray-600">
                            Be the first to add a comment to this task.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Comments ({totalComments})
                            </h3>
                            {totalComments > COMMENTS_PER_PAGE && (
                                <span className="text-sm text-gray-500">
                                    Page {currentPage} • Showing{" "}
                                    {loadedCommentsCount} of {totalComments}
                                </span>
                            )}
                        </div>

                        {displayedComments.map((comment) => (
                            <div
                                key={comment.id}
                                className={`flex gap-2 ${
                                    comment.isOptimistic ? "opacity-70" : ""
                                }`}
                            >
                                <div className="flex-shrink-0">
                                    {comment.author?.avatar ? (
                                        <img
                                            src={comment.author.avatar}
                                            alt={comment.author.name}
                                            className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-gray-100"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm ring-2 ring-offset-2 ring-blue-100">
                                            {comment.author?.name
                                                ?.charAt(0)
                                                .toUpperCase() || (
                                                <User className="w-5 h-5" />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div
                                        className={`rounded-lg p-2 ${
                                            comment.isOptimistic
                                                ? "bg-blue-50 border border-blue-100"
                                                : "bg-gray-50"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-gray-900">
                                                    {comment.author?.name ||
                                                        "Unknown User"}
                                                </span>
                                                {comment.isOptimistic && (
                                                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                                        Posting...
                                                    </span>
                                                )}
                                                <span className="text-gray-500 text-sm">
                                                    {format(
                                                        new Date(
                                                            comment.createdAt
                                                        ),
                                                        "MMM d 'at' h:mm a"
                                                    )}
                                                </span>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap break-words">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Load More Button */}
                        {hasNextPage && (
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={loadMoreComments}
                                    disabled={isFetchingNextPage}
                                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {isFetchingNextPage ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="w-4 h-4" />
                                            Load{" "}
                                            {Math.min(
                                                COMMENTS_PER_PAGE,
                                                remainingComments
                                            )}{" "}
                                            more
                                            {remainingComments > 0 &&
                                                ` (${remainingComments} remaining)`}
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {!hasNextPage && displayedComments.length > 0 && (
                            <div className="text-center py-4 text-gray-500 text-sm border-t border-gray-200">
                                All comments loaded
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Comments;
