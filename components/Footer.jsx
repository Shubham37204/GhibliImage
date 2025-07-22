import React from "react";
import { Sparkles, Heart, Palette } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-gray-100 border-t border-gray-200 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo + Text */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Ghibli AI
            </h1>
          </div>

          {/* Footer note */}
          <div className="text-sm text-gray-500 text-center flex flex-wrap justify-center gap-2">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for Studio Ghibli fans
            </span>
            <span className="hidden sm:inline">||</span>
            <span>© 2025 Ghibli AI. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

