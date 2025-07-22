"use client";

import { Button } from "@/components/components/ui/button";
import { usePathname } from "next/navigation";
import { Palette, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                                <Palette className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Sparkles className="w-3 h-3 text-white p-0.5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                            Ghibli AI
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/"
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${pathname === "/"
                                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/gallery"
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${pathname === "/gallery"
                                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/history"
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${pathname === "/history"
                                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            History
                        </Link>
                        <Link
                            href="/faq"
                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${pathname === "/faq"
                                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                        >
                            FAQ
                        </Link>
                    </nav>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <Link href="/create" className="flex items-center">
                                <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                                Create Magic
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200/50">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/"
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === "/"
                                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/gallery"
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === "/gallery"
                                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                Gallery
                            </Link>
                            <Link
                                href="/history"
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === "/history"
                                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                History
                            </Link>
                            <Link
                                href="/faq"
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${pathname === "/faq"
                                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                                    : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                FAQ
                            </Link>
                            <div className="pt-2">
                                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl shadow-lg">
                                    <Link href="/create" className="flex items-center justify-center" onClick={toggleMenu}>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Create Magic
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default NavBar;
