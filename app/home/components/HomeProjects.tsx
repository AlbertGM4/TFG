// tejedor/home/components/HomeProjects.tsx
import React from 'react';
import '../Home.css';


const HomeProjects = () => {

    return (

        <section className="flex justify-center" >
            <div className="flex bg-white w-4/5 h-96 relative">
                <div className="background-image flex bg-cover bg-no-repeat bg-start w-1/4 h-full" />
                <div className="content-center w-full mr-10">
                    <div className="w-fit h-fit bg-zinc-500 content-center text-center text-white text-4xl mb-5 w-full h-3/4 p-5">
                        <h1>Proyectos</h1>
                        <h2 className="p-5">Diseños de crochet para marcas, blogs y editoriales del sector</h2>
                        <button className="cursor-pointer bg-black hover:bg-slate-700 border-none rounded-xl text-base px-5 py-2.5">Ver proyectos</button>
                    </div>
                </div>
            </div>
        </section >

    );
};

export default HomeProjects;
