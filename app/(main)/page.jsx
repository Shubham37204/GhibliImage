//for old code go to old/landingpage
"use client";
import { ArrowRight, Sparkles, Zap, Heart, Target, Palette, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/components/ui/button";
import Footer from "@/components/Footer";

const LandingPage = () => {
    return (
        <div className="w-full overflow-hidden">
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section className="relative text-center py-32 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
                {/* Static background elements - no animations to avoid canvas issues */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-teal-300 to-emerald-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
                            <Sparkles className="w-5 h-5 text-emerald-600 mr-2" />
                            <span className="text-emerald-700 font-semibold">AI-Powered Studio Ghibli Art</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent leading-tight">
                        Transform Photos into<br />
                        <span className="relative">
                            Ghibli Magic
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Experience the enchanting world of Studio Ghibli with our AI-powered generator.
                        Transform any photo into breathtaking Miyazaki-inspired artwork in seconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <Link href="/create" className="flex items-center">
                                <Palette className="mr-2 h-5 w-5" />
                                Start Creating Magic
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button variant="outline" className="px-8 py-4 rounded-2xl border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300">
                            <Users className="mr-2 h-5 w-5" />
                            View Gallery
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex flex-col lg:flex-row px-8 py-24 gap-16 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
                            <span className="text-emerald-700 font-semibold text-sm">✨ AI-Powered Magic</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            Photo to Ghibli Art<br />
                            <span className="text-emerald-600">in Seconds</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Transform any photo into beautiful Studio Ghibli-style artwork with our advanced AI.
                            Simply upload your image and describe your vision – our generator will craft a magical transformation
                            that captures the essence of Miyazaki's enchanting world.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-emerald-50 transition-all duration-300 cursor-pointer">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Palette className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">Simple AI Prompting</h3>
                                <p className="text-gray-600">Use everyday language to guide the transformation. No artistic background needed – just describe your vision.</p>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-emerald-50 transition-all duration-300 cursor-pointer">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">Style Control</h3>
                                <p className="text-gray-600">Select specific influences like Spirited Away, Totoro, or Howl's Moving Castle for authentic results.</p>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-emerald-50 transition-all duration-300 cursor-pointer">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">Character Integration</h3>
                                <p className="text-gray-600">Add pets, family, or friends into your Ghibli scenes with stylized charm and magical detail.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative">
                            <Image
                                src="/assets/shubham.png"
                                alt="Ghibli style transformation example"
                                className="rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                                width={400}
                                height={500}
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="w-5 h-5 text-emerald-500" />
                                    <span className="font-semibold text-gray-700">AI Generated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Features Grid */}
            <section className="py-24 px-4 bg-gradient-to-br from-slate-50 to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-4">
                            <span className="text-gray-600 font-semibold text-sm">🚀 Powerful Features</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Ghibli AI?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Cutting-edge technology meets artistic magic to deliver unparalleled results
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Pixel-Perfect Accuracy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our advanced AI algorithms ensure your photos maintain their essence while adopting
                                the distinctive Ghibli aesthetic with stunning accuracy.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Lightning Fast</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get your transformed Ghibli artwork in seconds with our optimized processing technology.
                                No waiting, just instant magical results.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900">Studio Quality</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Create high-resolution artwork that perfectly captures the magical Studio Ghibli aesthetic
                                with professional-grade quality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Call to Action */}
            <section className="relative text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-24 px-4 overflow-hidden">
                {/* Static background - no animations */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <Sparkles className="w-5 h-5 text-white mr-2" />
                        <span className="text-white font-semibold">Join the Magic</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                        Create Your Magical<br />
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                            Ghibli Artwork Today
                        </span>
                    </h2>

                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of artists and Studio Ghibli fans creating breathtaking Miyazaki-inspired images.
                        Your magical journey starts here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button className="group bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold">
                            <Link href="/create" className="flex items-center">
                                <Palette className="mr-2 h-5 w-5" />
                                Start Creating - Free
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
           <Footer/>
        </div>
    );
};

export default LandingPage;
