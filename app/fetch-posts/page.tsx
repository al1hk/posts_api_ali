interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function getPosts() {
  const response = await fetch('http://localhost:3000/api/external', {
    next: {
      revalidate: 3600
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const data = await response.json();
  return data.posts;
}

export function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            <img
              src={`https://picsum.photos/seed/${post.id}/400/250`}
              alt={`Cover for ${post.title}`}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              Post #{post.id}
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              {post.body}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  {post.userId}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Author</span>
              </div>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Read More →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <PostsGrid posts={posts} />
    </div>
  );
}
