import MagicButton from '@/components/ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/moving-border";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import React from 'react'

function Hero() {
  return (
    <section className="">
  <div className=" mx-auto max-w-screen-xl z-30 px-4 pt-32 lg:flex bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
    <div className="mx-auto text-center">
    <TextGenerateEffect
            words="Create Your Form With Artificial Intelligence"
            className= "text-center text-[40px] md:text-5xl lg:text-6xl"
            
          />

      <p className="mt-4 sm:text-xl/relaxed text-gray-500">
        Create your form with our AI powered form builder. With just a topic, our AI will generate a form for you to use.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button duration={Math.floor(Math.random() * 1000) + 1000}
            borderRadius="1.95rem" style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(2,0,36)",
              backgroundColor:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(15,70,179,1) 35%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="block w-full rounded  px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto">
          Create Form
        </Button>

       
        <Button duration={Math.floor(Math.random() * 1000) + 1000}
            borderRadius="1.95rem" style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              
              
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-700 focus:outline-none focus:ring active:text-purple-500 sm:w-auto"
            href="">
          Learn More
        </Button>
      </div>
    </div>
  </div>
  <section className="bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
  <div className="mx-auto max-w-screen-xl px-4 py-56">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">How it Works</h2>

      <p className="mt-4 text-gray-500">
      Our SaaS app lets you quickly create forms from any prompt, share them via a unique link, and securely save all responses in the database for easy tracking and analysis
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
       <AtomIcon className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Write promot for your form</h2>

        <p className="mt-1 text-sm text-gray-600">
        Input your prompt, and our AI-powered tool creates a fully customizable form tailored to your needs.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Edit className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Edit Your form </h2>

        <p className="mt-1 text-sm text-gray-600">
          Easily edit your form to include additional questions, change the order of questions, or adjust the form &apos;s appearance.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Share2 className='h-8 w-8' />

        <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

        <p className="mt-1 text-sm text-gray-600">
          Share your form with a unique link, and start collecting responses in real-time. Easily track and analyze responses.
        </p>
      </a>

    
    </div>

    <div className="mt-12 text-center">
      <a
      href="/sign-in">
        <MagicButton
              otherClasses="border-2 border-violet-500"
              
              title="Get Started Today"
              icon={<FaLocationArrow />}

              position="right"
              
            />


      </a>

      
    </div>
  </div>
</section>
</section>
  );
}

export default Hero;