import PostsGrid from '../components/PostsGrid';
import Link from 'next/link';

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

export default async function FetchPostsPage() {
  const posts = await getPosts();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/"
              className="inline-block mb-8 text-blue-100 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Latest Posts</h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-8"></div>
            <div className="flex justify-center space-x-4 mb-8 animate-fade-in-delay">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>{posts.length} Posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{Math.max(...posts.map(p => p.userId))} Authors</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative bottom curve */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-gray-50 dark:text-gray-900"
            preserveAspectRatio="none"
          >
            <path
              d="M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Posts Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Posts</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover interesting stories and insights</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-shadow">
                Latest
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg shadow hover:shadow-md transition-shadow">
                Popular
              </button>
            </div>
          </div>
        </div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
