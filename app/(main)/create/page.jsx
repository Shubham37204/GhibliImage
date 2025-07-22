'use client'
import React, { useState } from 'react';
import NavBar from "@/components/NavBar";
import Footer from '@/components/Footer';

const CreatePage = () => {
    const [activeTab, setActiveTab] = useState('photo');
    const [selectedStyle, setSelectedStyle] = useState('Analog Film');

    // Photo to Art states
    const [selectedImage, setSelectedImage] = useState(null);
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [photoGenerating, setPhotoGenerating] = useState(false);
    const [photoGeneratedImage, setPhotoGeneratedImage] = useState(null);

    // Text to Art states
    const [textPrompt, setTextPrompt] = useState('');
    const [textGenerating, setTextGenerating] = useState(false);
    const [textGeneratedImage, setTextGeneratedImage] = useState(null);

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPhotoGeneratedImage(null); // Reset previous generation
        }
    };

    // Handle drag and drop
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setPhotoGeneratedImage(null); // Reset previous generation
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Convert image to base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const saveToLocalHistory = (newItem) => {
        const history = JSON.parse(localStorage.getItem("ghibli_history") || "[]");
        const updatedHistory = [newItem, ...history]; // latest first
        localStorage.setItem("ghibli_history", JSON.stringify(updatedHistory));
    };

    // Generate art from photo
    const handlePhotoToArt = async () => {
        if (!selectedImage) return;
        setPhotoGenerating(true);
        try {
            const base64Image = await convertToBase64(selectedImage);
            let prompt = "Transform this image into Studio Ghibli art style, with soft colors, magical atmosphere, and hand-drawn aesthetic";
            if (additionalDetails.trim()) {
                prompt += `. Additional details: ${additionalDetails}`;
            }
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    image: base64Image
                }),
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setPhotoGeneratedImage(data.image);
            saveToLocalHistory({ image: data.image, createdAt: new Date().toISOString() });

        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setPhotoGenerating(false);
        }
    };

    // Generate art from text
    const handleTextToArt = async () => {
        if (!textPrompt.trim()) return;

        setTextGenerating(true);
        try {
            const stylePrompt = `${textPrompt} in ${selectedStyle} style, Studio Ghibli aesthetic, magical and dreamy atmosphere`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: stylePrompt
                }),
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setTextGeneratedImage(data.image);
            saveToLocalHistory({ image: data.image, createdAt: new Date().toISOString() });

            // Save to localStorage history
            const history = JSON.parse(localStorage.getItem("textPromptHistory") || "[]");
            history.unshift(textPrompt); // add to start
            localStorage.setItem("textPromptHistory", JSON.stringify(history.slice(0, 50))); 

        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setTextGenerating(false);
        }
    };


    // Check if photo form is valid
    const isPhotoFormValid = selectedImage !== null;

    // Check if text form is valid
    const isTextFormValid = textPrompt.trim() !== '';

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('photo')}
                            className={`px-6 py-3 text-sm font-medium ${activeTab === 'photo'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Photo to Art
                        </button>
                        <button
                            onClick={() => setActiveTab('text')}
                            className={`px-6 py-3 text-sm font-medium ${activeTab === 'text'
                                ? 'text-gray-900 border-b-2 border-gray-900'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Text to Art
                        </button>
                    </div>
                </div>

                {/* Photo to Art Tab */}
                {activeTab === 'photo' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">Photo to Ghibli Art</h2>
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    {selectedImage ? (
                                        <div>
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Selected"
                                                className="max-w-full max-h-48 mx-auto rounded-lg mb-4"
                                            />
                                            <p className="text-green-600 font-medium">{selectedImage.name}</p>
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove image
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-600 mb-4">Drag and drop your image here</p>
                                            <p className="text-gray-500 text-sm mb-4">or</p>
                                            <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
                                                Browse files
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileSelect}
                                                    className="hidden"
                                                />
                                            </label>
                                        </>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Details (Optional)
                                    </label>
                                    <textarea
                                        value={additionalDetails}
                                        onChange={(e) => setAdditionalDetails(e.target.value)}
                                        placeholder="Add any specific details or modifications you'd like..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={3}
                                    />
                                </div>
                                <button
                                    onClick={handlePhotoToArt}
                                    disabled={!isPhotoFormValid || photoGenerating}
                                    className={`w-full mt-6 py-3 rounded-md transition-all duration-200 ${!isPhotoFormValid
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : photoGenerating
                                            ? 'bg-blue-500 text-white cursor-wait'
                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {photoGenerating ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Generating in a few minutes...
                                        </div>
                                    ) : (
                                        'Transform to Ghibli Art'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
                                {photoGeneratedImage ? (
                                    <div className="text-center">
                                        <img
                                            src={photoGeneratedImage}
                                            alt="Generated Ghibli Art"
                                            className="max-w-full max-h-96 rounded-lg shadow-lg"
                                        />
                                        <p className="text-green-600 font-medium mt-4">Your Ghibli art has been generated!</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center">Your generated Ghibli art will appear here.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Text to Art Tab */}
                {activeTab === 'text' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-6">Text to Ghibli Art</h2>

                                <div className="mb-6">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600">Generate Ghibli art from your text description</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Description
                                    </label>
                                    <textarea
                                        value={textPrompt}
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                        placeholder="Describe the Ghibli scene you want to create in detail..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={4}
                                    />
                                </div>

                                <button
                                    onClick={handleTextToArt}
                                    disabled={!isTextFormValid || textGenerating}
                                    className={`w-full py-3 rounded-md transition-all duration-200 ${!isTextFormValid
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : textGenerating
                                            ? 'bg-blue-500 text-white cursor-wait'
                                            : 'bg-gray-600 text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {textGenerating ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Generating in a few minutes...
                                        </div>
                                    ) : (
                                        'Generate Ghibli Art'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
                                {textGeneratedImage ? (
                                    <div className="text-center">
                                        <img
                                            src={textGeneratedImage}
                                            alt="Generated Ghibli Art"
                                            className="max-w-full max-h-96 rounded-lg shadow-lg"
                                        />
                                        <p className="text-green-600 font-medium mt-4">Your Ghibli art has been generated!</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center">Your generated Ghibli art will appear here.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default CreatePage;
