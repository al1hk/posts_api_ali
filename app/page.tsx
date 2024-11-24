import Image from "next/image";
import { PostsGrid } from "./fetch-posts/page";

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

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Discover Amazing Stories
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our collection of handpicked articles covering the most fascinating topics
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-24 text-gray-50 dark:text-gray-900"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Articles
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        <PostsGrid posts={posts} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p> Ali Hassan API Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
