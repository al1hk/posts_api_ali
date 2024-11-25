interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post: Post, index) => (
        <div
          key={post.id}
          className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-0 transition-opacity duration-500"></div>
            <img
              src={`https://picsum.photos/seed/${post.id}/400/250`}
              alt={`Cover for ${post.title}`}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              Post #{post.id}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium shadow-lg">
                {post.userId}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Author</div>
              <div className="flex-grow"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 text-sm">
              {post.body}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <button className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{Math.floor(Math.random() * 100)}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">{Math.floor(Math.random() * 50)}</span>
                </button>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                Read More →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

