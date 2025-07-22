import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react';
import { FaMagic, FaQuestionCircle, FaBookmark, FaImage, FaLock, FaExclamationTriangle, FaUserSecret, FaHistory } from 'react-icons/fa';

const faqs = [
  {
    question: "What is Ghibli AI?",
    answer: "Ghibli AI is an AI-powered tool that transforms your photos or prompts into Studio Ghibli-inspired artwork using advanced machine learning models.",
    icon: <FaMagic className="text-emerald-600 text-3xl" />,
  },
  {
    question: "How do I generate a Ghibli-style image?",
    answer: "Simply go to the 'Create Magic' page, upload a photo or enter a text prompt, and let the AI generate a unique Ghibli-style image for you.",
    icon: <FaImage className="text-emerald-600 text-3xl" />,
  },
  {
    question: "Can I save and bookmark my favorite images?",
    answer: "Yes! You can save generated images to your gallery and bookmark your favorites for quick access later.",
    icon: <FaBookmark className="text-emerald-600 text-3xl" />,
  },
  {
    question: "Are the generated images high resolution?",
    answer: "Yes, the images are generated in high resolution, suitable for sharing and printing.",
    icon: <FaImage className="text-emerald-600 text-3xl" />,
  },
  {
    question: "What are the advantages of using Ghibli AI?",
    answer: "Ghibli AI offers fast, high-quality, and magical transformations, allowing anyone to create Ghibli-style art without any artistic skills.",
    icon: <FaMagic className="text-emerald-600 text-3xl" />,
  },
  {
    question: "Is my data safe?",
    answer: "All your images and prompts are stored locally in your browser and are not shared with anyone.",
    icon: <FaLock className="text-emerald-600 text-3xl" />,
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "The generated images are for personal use only. For commercial use, please check the terms and conditions.",
    icon: <FaUserSecret className="text-emerald-600 text-3xl" />,
  },
  {
    question: "Why can't I see my old images?",
    answer: "Images are stored in your browser's local storage. If you clear your browser data or use a different device, your saved images may not appear.",
    icon: <FaHistory className="text-emerald-600 text-3xl" />,
  },
];

const page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-10 text-emerald-700 drop-shadow">Frequently Asked Questions</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-emerald-200 hover:shadow-xl duration-200 group"
              >
                <div className="mb-4">{faq.icon}</div>
                <h2 className="text-lg font-semibold text-emerald-700 mb-2 text-center group-hover:underline">{faq.question}</h2>
                <p className="text-gray-700 text-base text-center">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;