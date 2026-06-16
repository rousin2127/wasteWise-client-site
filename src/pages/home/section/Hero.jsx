import React from 'react';
import Banner from '../../../assets/WasteBanner.png';

const Hero = () => {
    return (
        <section>
            {/* Hero Container - 60% viewport height */}
            <div 
                className="relative h-[60vh] w-full bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${Banner})` }}
            >
                {/* Overlay layer for text readability */}
                <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-5">
                    
                    {/* The Slogan */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-md max-w-3xl">
                        Clean Streets, Clear Future: Your City, Your Choice.
                    </h1>
                    
                    {/* The CTAs */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                            Be a Resident
                        </button>
                        <button className="px-7 py-3 bg-white hover:bg-gray-100 text-slate-800 font-semibold rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                            Be a Rider
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;