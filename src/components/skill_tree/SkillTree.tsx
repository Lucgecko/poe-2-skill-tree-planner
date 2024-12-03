import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Node from './Node';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { useAscendancy } from '@/contexts/AscendancyContext';
import { useAllNodes } from '@/contexts/AllNodesContext';
import NodeList from './NodeList';

interface SkillTreeProps {
  wrapperRef: Ref<ReactZoomPanPinchContentRef> | null;
}

const SkillTree: React.FC<SkillTreeProps> = ({wrapperRef}) => {
  const { ascendancy} = useAscendancy();

  const [prevAscImg, setPrevAscImg] = useState<string>("");
  const [currAscImg, setCurrAscImg] = useState<string>("");

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);



  const imageWidth = 2750;
  const imageHeight = 2864;

  const scale = Math.min(windowWidth / imageWidth, (windowHeight - 100) / imageHeight);

  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);

        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const prev = currAscImg;
    setCurrAscImg(`/asc2/${ascendancy}.webp`);

  }, [ascendancy, setPrevAscImg, setCurrAscImg]);
  
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: { clientX: number; clientY: number; }) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
    }
  };

  const updatePrev = () => {
    setPrevAscImg(currAscImg);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>

    <TransformWrapper
    ref={wrapperRef}
    initialScale={2}
    minScale={0.8}
    maxScale={10}
    centerOnInit={true}
    doubleClick={{disabled: true}}
    panning={{velocityDisabled: true}}
    smooth={true}
    wheel={{step:0.3, smoothStep: 0.005}}
    >
      <TransformComponent>

      <div
      style={{
        position: 'relative',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        

      }}

      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Reset on mouse leave
      className={`${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div
        style={{
          position: 'relative',
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}

        ref={divRef}
        onClick={handleClick}
      >
        <img
          src="/skill-tree.webp"
          alt="Skill Tree Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
          {
            
          }

          {prevAscImg && 
          <div
              style={{
                position: 'absolute',
                top: '50.4%',
                left: '50.15%',
                transform: 'translate(-50%, -50%)',
                width:"100px", 
                aspectRatio: '1',
                borderRadius: '50%', // Makes it a circle
                overflow: 'hidden', // Ensures the image is clipped to the circle
              }}
            >
                <Image
                src={prevAscImg}
                alt="asc"
                fill={true}
                
                priority={true}
                quality={30}
                sizes="width: 800px"

                className="transition-opacity duration-500 opacity-100"
                style={{ objectFit: 'cover' }}
              />
          </div>
          }
            { currAscImg && 

            <div
                style={{
                  position: 'absolute',
                  top: '50.4%',
                  left: '50.15%',
                  transform: 'translate(-50%, -50%)',
                  width:"100px", 
                  aspectRatio: '1',
                  borderRadius: '50%', // Makes it a circle
                  overflow: 'hidden', // Ensures the image is clipped to the circle
                }}
              >
            <Image
              src={currAscImg}
              alt="asc"
              fill={true}
              
              priority={true}
              loading="eager"
              sizes="(max-width: 2000px) 100vw, (max-width: 2000px) 50vw, 33vw"
              quality={75}
              onLoad={updatePrev}

              className="transition-opacity duration-500 opacity-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

        }

  

        <NodeList/>

      </div>
      </div>

      </TransformComponent>
      </TransformWrapper>
    </div>

  );
};

export default React.memo(SkillTree);
