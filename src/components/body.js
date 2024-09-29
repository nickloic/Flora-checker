import React, { useState } from 'react'
import { delay, motion } from 'framer-motion'
import * as FaIcons from 'react-icons/fa'
import { Typewriter } from 'react-simple-typewriter'
import Loader from './loader';


export default function Body() {

    function previewImagefunc(input, previewElement) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewElement.src = e.target.result; // Met l'URL de l'image dans l'élément img  
                setpreviewImage(true)
            }
            reader.readAsDataURL(file); // Lit le fichier
        } else {
            previewElement.src = ''; // Réinitialise si aucun fichier
        }
    }


    const handlediv1 = () => {
        let ipt = document.querySelectorAll('.image')
        ipt.forEach(ipts => {
            ipts.addEventListener('change', () => {
                document.querySelectorAll('.preview').forEach(prevs => {
                    previewImagefunc(ipts, prevs)
                })
            })
        });
    }

    const Identifierfunc = async () => {
        setresultData({})
        console.log('requette en cours...');
        setreqPending(true)
        
        const form = new FormData();
        const iptImages = document.querySelectorAll('.image')
        iptImages.forEach(async (img) => {

            if (img.files[0]) {
                form.append('organs', 'leaf');
                form.append('images', img.files[0]);
            }
        })

        const project = 'all';

        try {
            const apiKey = process.env.REACT_APP_PLANTNET_API_KEY;
            
            const response = await fetch(`https://my-api.plantnet.org/v2/identify/${project}?include-related-images=true&api-key=${apiKey}&lang=fr`, {
                method: 'POST',
                body: form,
            });
            console.log(response);
            if (response.status === 200) {
                console.log('reponses disponibles');
                setreqPending(false)
                
            } else if (response.status === 404) {
                alert(' Espece non trouvée :( \n Importez une nouvelle photo')
                document.querySelectorAll('.preview').forEach(prevs => {
                    prevs.src = ''})
            }

            const data = await response.json();

            let scores = Math.round((data.results[0].score) * 100)

            setresultData(data)
            toggleViewResult(scores)

        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            console.log('requette terminee');
            setreqPending(false)
        }
    }

    function animateCount(element, start, end, duration) {
        let startTime = null;

        function updateCount(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);

            element.textContent = currentCount;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    const toggleViewResult = (score) => {
        setviewResult(!viewResult)
        let counterElement = document.querySelectorAll('.counter')
        counterElement.forEach(el => {
            animateCount(el, 0, score, 2000); // Compte de 0 à 1000 en 2 secondes
        });

    }

    const div1Variants = {
        hidden: { opacity: 0, y: '-100%', display: 'none' },
        visible: { opacity: 1, y: '0%', display: 'flex' }
    }
    const prevVariants = {
        hidden: { opacity: 0, y: '100%', display: 'none' },
        visible: { opacity: 1, y: '0%', display: 'flex', transition: { delay: 0.5 } }
    }
    const resultVariants = {
        hidden: { opacity: 0, y: '100%', display: 'none' },
        visible: { opacity: 1, y: '0%', display: 'flex' }
    }
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const [previewImage, setpreviewImage] = useState(false);
    const [viewResult, setviewResult] = useState(false);
    const [resultData, setresultData] = useState({});
    const [reqPending, setreqPending] = useState(false);

    return (
        <div>
            {reqPending ? <Loader/> : null}
            <div className='max-sm:hidden'>
                {/* premierer div */}

                <motion.div className='div1  mx-auto h-96 my-16 flex flex-col gap-10 justify-center items-center relative z-10'
                    variants={div1Variants}
                    initial="visible"
                    animate={previewImage ? 'hidden' : null}
                >
                    <p className='text-5xl relative z-10'>
                        HI ! 👋<br /> Identifiez Instantanément Vos Plantes <br /> Grâce à Notre Application Innovante!
                    </p>
                    <img src='images/img1.jpg' className='absolute z-0 top-52 left-32 w-48 rounded-xl shadow-lg' />
                    <img src='images/img2.jpg' className='absolute z-0 rounded-xl w-48 h-64 right-10 top-0 shadow-lg' />
                    <img src='images/img3.jpg' className='absolute opacity-80 z-0 w-64 right-20 top-44 rounded-xl shadow-lg' />
                </motion.div>

                {/* deuxieme */}
                <motion.div className='h-96 my-16 flex flex-col justify-center items-center rounded gap-3 z-10'
                    variants={prevVariants}
                    initial='hidden'
                    animate={previewImage ? 'visible' : null}
                >
                    <img className='w-60 h-60 bg-black rounded preview' id='preview' />
                    <button onClick={Identifierfunc} type='button' id='submit' className='p-3 bg-soft-black text-soft-white rounded'>
                        Identifier
                    </button>
                </motion.div>

                {/* troisieme */}
                <motion.div className='absolute flex z-20 w-11/12 p-3 flex-col bg-white h-2/5 bottom-0 left-16 rounded-t-3xl'
                    variants={resultVariants}
                    initial='hidden'
                    animate={viewResult ? 'visible' : null}
                >
                    <div className='w-full justify-center flex flex-col'>
                        <div>
                            <h1>
                                Noms famillier : {resultData.results ? resultData.results[0].species.commonNames.map((val, id) => (
                                    <span key={id}>
                                        {' - '}<span className='text-soft-green'>{val}</span>
                                    </span>
                                )) : null}
                            </h1>
                            <h1>
                                Niveau de confiance : {<span className='text-soft-green'><span className='counter'>0</span> %</span>}
                            </h1>
                        </div>
                        Images relatives :
                        <motion.div className='grid grid-cols-10 p-2 gap-2'
                            variants={container}
                            initial="hidden"
                            animate="visible"
                        >
                            {resultData.results ? resultData.results[0].images.map((val, id) => (
                                <motion.img key={id} src={val.url.o} className='w-32 h-32 bg-soft-black'
                                    variants={item}
                                />
                            )) : null}
                        </motion.div>
                    </div>
                    <button onClick={toggleViewResult} type='button' className='bg-soft-green w-1/4 m-auto p-2 rounded'>
                        ok
                    </button>
                </motion.div>

                <div className='flex justify-center divipt'>
                    <label onClick={handlediv1} className='bg-soft-green p-3 rounded cursor-pointer'>
                        <span className='flex items-center gap-2 flex-col'><FaIcons.FaUpload />Importer une image</span>
                        <input type="file" id="image" accept="image/*" className='hidden image' />
                    </label>
                </div>

            </div>
            {/* ecrant sm */}
            <div className='hidden max-sm:block'>
                {/* div1 */}
                <motion.div className=' flex flex-col'
                    variants={div1Variants}
                    initial="visible"
                    animate={previewImage ? 'hidden' : null}
                >
                    <h1 className='text-2xl my-5 text-soft-green'>
                        <Typewriter
                            words={['Vos plantes notre priorité', 'Ameliorez vos connaissances', 'Pratique', 'Simple d\'utilisation']}
                            loop={false}
                            cursor
                            cursorStyle='_'
                        />
                    </h1>
                    <p className=''>HI ! 👋 <br />
                        Identifiez Instantanément Vos Plantes
                        Grâce à Notre Application Innovante!
                    </p>
                </motion.div>

                {/* div2 */}
                <motion.div className='h-96 flex flex-col justify-center items-center rounded gap-3 z-10'
                    variants={prevVariants}
                    initial='hidden'
                    animate={previewImage ? 'visible' : null}
                // animate = 'visible'
                >
                    <img className='w-60 h-60 bg-black rounded preview' id='previewsm' />
                    <button onClick={Identifierfunc} type='button' id='submitsm' className='p-3 bg-soft-black text-soft-white rounded submit'>
                        Identifier
                    </button>
                </motion.div>

                {/* div resultats */}
                <div>
                    <motion.div className='fixed flex z-20 w-full p-3 flex-col bg-white h-2/5 bottom-20 rounded-t-3xl'
                        variants={resultVariants}
                        initial='hidden'
                        animate={viewResult ? 'visible' : null}
                        // animate = 'visible'
                    >
                        <div className='w-full justify-center flex flex-col'>
                            <div>
                                <h1>
                                    Noms famillier : {resultData.results ? resultData.results[0].species.commonNames.map((val, id) => (
                                        <span key={id}>
                                            {' - '}<span className='text-soft-green'>{val}</span>
                                        </span>
                                    )) : null}
                                </h1>
                                <h1>
                                    Niveau de confiance : {<span className='text-soft-green'><span className='counter'>0</span> %</span>}
                                </h1>
                            </div>
                            Images relatives :
                            <motion.div className='grid grid-cols-3 p-2 gap-2'
                                variants={container}
                                initial="hidden"
                                animate="visible"
                            >
                                {resultData.results ? resultData.results[0].images.slice(0, 3).map((val, id) => (
                                    <motion.img key={id} src={val.url.o} className='w-32 h-32 bg-soft-black'
                                        variants={item}
                                    />
                                )) : null}
                            </motion.div>
                        </div>
                        <button onClick={toggleViewResult} type='button' className='bg-soft-green w-1/4 m-auto p-2 rounded'>
                            ok
                        </button>
                    </motion.div>
                </div>

                <div className='flex justify-center divipt relative top-20'>
                    <label onClick={handlediv1} className='bg-soft-green p-3 rounded cursor-pointer'>
                        <span className='flex items-center gap-2 flex-col'><FaIcons.FaUpload />Importer une image</span>
                        <input type="file" id="imagesm" accept="image/*" className='hidden image' />
                    </label>
                </div>
                {
                    previewImage ? null : <img src='images/img3.jpg' className='rounded relative top-40' />
                }
            </div>
        </div>
    )
}
