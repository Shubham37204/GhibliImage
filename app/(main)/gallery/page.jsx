//for old code go to old/GalleryPage
'use client';
import React, { useEffect, useState } from 'react';
import { Download, Bookmark, X } from 'lucide-react';
import NavBar from '@/components/NavBar';

const IMAGES_PER_PAGE = 25;

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [savedImages, setSavedImages] = useState([]);
  const [bookmarkedImages, setBookmarkedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ghibli_history') || '[]');
    const bookmarks = JSON.parse(localStorage.getItem('ghibli_bookmarks') || '[]');
    setSavedImages(saved);
    setBookmarkedImages(bookmarks);
  }, []);

  const handleDownload = async (url, filename = 'ghibli-art.png') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert('Failed to download image.');
    }
  };

  const handleBookmark = (image) => {
    const updatedBookmarks = [...bookmarkedImages, image];
    setBookmarkedImages(updatedBookmarks);
    localStorage.setItem('ghibli_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const handleUnbookmark = (image) => {
    const updatedBookmarks = bookmarkedImages.filter((img) => img.image !== image.image);
    setBookmarkedImages(updatedBookmarks);
    localStorage.setItem('ghibli_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const paginatedImages = (list) => {
    const start = (currentPage - 1) * IMAGES_PER_PAGE;
    return list.slice(start, start + IMAGES_PER_PAGE);
  };

  const totalPages = (list) => Math.ceil(list.length / IMAGES_PER_PAGE);

  const changePage = (delta) => {
    setCurrentPage((prev) => prev + delta);
  };

  // Separate images by age
  const now = new Date();
  const newImages = savedImages.filter(img => {
    if (!img.createdAt) return true;
    return (now - new Date(img.createdAt)) < 24 * 60 * 60 * 1000;
  });
  const oldImages = savedImages.filter(img => {
    if (!img.createdAt) return false;
    return (now - new Date(img.createdAt)) >= 24 * 60 * 60 * 1000;
  });

  const renderImagesGrid = (images, isBookmarkTab) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[600px] overflow-y-auto p-2 bg-white/60 rounded-xl">
      {images.map((item, idx) => (
        <div key={idx} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt="Generated Art"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium truncate">{item.prompt || 'Generated Art'}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center space-x-2">
              <button
                onClick={() => handleDownload(item.image, `ghibli-${idx}.png`)}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              {isBookmarkTab ? (
                <button
                  onClick={() => handleUnbookmark(item)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              ) : (
                <button
                  onClick={() => handleBookmark(item)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Bookmark</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar /> {/* ✅ NavBar placed at top */}
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">🎨 Ghibli Art Gallery</h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          Discover and save your favorite Ghibli-inspired artwork
        </p>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'saved'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              onClick={() => {
                setActiveTab('saved');
                setCurrentPage(1);
              }}
            >
              Saved Images
            </button>
            <button
              className={`ml-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'bookmarked'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              onClick={() => {
                setActiveTab('bookmarked');
                setCurrentPage(1);
              }}
            >
              Bookmarks
            </button>
          </div>
        </div>

        {activeTab === 'saved' && (
          <>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2 mt-8">Newly Generated Images (Last 24 Hours)</h2>
            {newImages.length > 0 ? renderImagesGrid(newImages, false) : <div className="text-gray-500 mb-8">No new images found.</div>}
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2 mt-8">Older Images</h2>
            {oldImages.length > 0 ? renderImagesGrid(oldImages, false) : <div className="text-gray-500">No older images found.</div>}
          </>
        )}
        {activeTab === 'bookmarked' && renderImagesGrid(bookmarkedImages, true)}

        {(activeTab === 'saved' && savedImages.length > IMAGES_PER_PAGE) ||
          (activeTab === 'bookmarked' && bookmarkedImages.length > IMAGES_PER_PAGE) ? (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={() => changePage(-1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              ← Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Page</span>
              <span className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium">
                {currentPage}
              </span>
            </div>

            <button
              onClick={() => changePage(1)}
              disabled={currentPage === totalPages(activeTab === 'saved' ? savedImages : bookmarkedImages)}
              className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              Next →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GalleryPage;
