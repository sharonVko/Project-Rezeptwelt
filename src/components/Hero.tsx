/* const Hero = () => {
    return ( 
        <section className="hero bg-slate-400 py-20 text-center mb-8 bg-[url(/Banner.png)]">
            <h3 className="px-24 text-white text-xl font-semibold">Lassen Sie sich inspirieren, kochen Sie mit <br /> Leidenschaft und erleben Sie unvergessliche <br /> Momente bei Tisch.</h3>
        </section>
     );
}
 
export default Hero; */



import React from "react";
import { Tables } from "../utils/database";

interface HeroProps {
  heroProps?: Tables<'recipes'> | null;  // Prop auf optional gesetzt
}

const Hero: React.FC<HeroProps> = ({ heroProps }) => {
  console.log("Hero Props:", heroProps);  

  const backgroundImage = heroProps?.image_url || '/Banner.png';

  return (
    <section
      className="hero py-24 text-center mb-8"
      style={{ backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',

       }}
    >
      <h3 className="px-24 text-white text-xl font-semibold">
        {heroProps?.name
          ? `${heroProps.name}`
          : (<>Lassen Sie sich inspirieren, kochen Sie mit <br/> Leidenschaft und erleben Sie unvergessliche <br/> Momente bei Tisch.</>)}
      </h3>
    </section>
  );
};

export default Hero;
