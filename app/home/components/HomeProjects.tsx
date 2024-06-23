// tejedor/home/components/HomeProjects.tsx
import React from 'react';
import '../Home.css';


const HomeProjects = () => {

    return (

        <section className="flex justify-center" >
            <div className="flex bg-white w-full md:w-4/5 max-w-screen-xl h-96 relative">
                <div className="background-image w-1/4 h-full bg-cover bg-no-repeat bg-start hidden md:block" />
                <div className="flex flex-col justify-center w-full md:w-3/4 px-5 py-10 md:px-0 md:py-0">
                    <div className="w-full h-3/4 md:h-full bg-zinc-500 flex flex-col justify-center text-center text-white text-4xl">
                        <h1>Proyectos</h1>
                        <h2 className="p-5">Diseños de crochet para marcas, blogs y editoriales del sector</h2>
                        <div className="flex justify-center">
                            <button className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-base py-2.5 px-5">
                                Ver proyectos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    );
};

export default HomeProjects;
