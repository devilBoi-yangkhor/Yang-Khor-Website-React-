import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import particlesOptions from "../particles.json";
import "../index.css"

export default function ParticlesConfig() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, [init]);

  return (
    <>
        {init && <Particles id="tsparticles" options={particlesOptions}/>}
    </>
  )
}
