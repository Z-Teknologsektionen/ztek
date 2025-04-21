
"use client";
import { MouseEventHandler, MutableRefObject, Touch, TouchEventHandler, useEffect, useRef, useState, type FC } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CommitteeImage } from "~/components/committees/committee-image";
const { atan2, sin, cos, exp, sqrt, min } = Math;

type CommitteeMemberCardProps = {
  email: string;
  image: string;
  name: string;
  nickName: string;
  phone: string;
  role: string;
};

type Rotation = {
  x: number,
  y: number,
  magnitude: number
}

export const CommitteeMemberCard: FC<CommitteeMemberCardProps> = ({
  email,
  image,
  name,
  nickName,
  phone,
  role,
}) => { 
  
  //state
  const defaultPosition = {x: 0, y: 0};
  const [ cursor, setCursor] = useState(defaultPosition);
  const [ cursorGhost, setCursorGhost] = useState(defaultPosition);
  const [ prevTimestamp, setTimestamp ] = useState(0);
  var animationFrameRef: MutableRefObject<number|undefined> = useRef();

  //mounting setup
  useEffect(()=>{
    const animate = (timestamp: DOMHighResTimeStamp): void => {
      update(timestamp);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);}
  });

  //HANDLER: Hover with mouse or stylus
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const cursor = cardLocalPos({x: e.clientX, y: e.clientY}, e.currentTarget);
    setCursor(cursor);
  }

  //HANDLER: Press and hold with finger or stylus
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch: Touch|undefined = e.targetTouches[0]; //discard other fingers
    if (touch) {
      const cursor = cardLocalPos({x: touch.clientX, y: touch.clientY}, e.currentTarget)
      cursor.y = cursor.x**3;   //y not inputable on mobile devices due to scroll interference, calculate as function of x instead
     setCursor(cursor);
    }
  }

  //Animate
  const update = (timestamp: DOMHighResTimeStamp): void => {

    const deltaTime = timestamp - prevTimestamp;
    setTimestamp(timestamp)

    const regulatorFactor = -0.1;
    const cursorDelta = {
      x: cursor.x - cursorGhost.x,
      y: cursor.y - cursorGhost.y
    };
    const newCursorGhost = { 
      x: cursorGhost.x + cursorDelta.x * exp(regulatorFactor*deltaTime),
      y: cursorGhost.y + cursorDelta.y * exp(regulatorFactor*deltaTime)
    };

    setCursorGhost(newCursorGhost);
  }

  /**
   * @param cursor - cursor pos in local card coords
   * @returns suitable rotation for card
   */
  const calcRotation = (cursor: {x: number, y: number}): Rotation => {
    const angleCoefficient = 30;
    const maxAngle = 40;
    const angle = min(maxAngle, angleCoefficient * sqrt(cursor.x**2 + cursor.y**2));
    return {x: cursor.y, y: cursor.x *-1, magnitude: angle};
  }

  /**
   * Translates coordinates to coord system of a card
   * @param clientAreaPos - browser client area position in px
   * @param targetedCard - card to translate coords to
   * @returns coords where: origin is center of card, 1 unit is largest radius of card
   */
  const cardLocalPos = (clientAreaPos: {x: number, y: number}, targetedCard: HTMLDivElement): {x: number, y:number} => {
    
    //card size
    const cardRect = targetedCard.getBoundingClientRect();        
    const cardRadius = Math.sqrt(cardRect.height**2 + cardRect.width**2)/2;

    //translate coords 
    var cardCenteredPos = {                                      
      x: clientAreaPos.x - (cardRect.left + cardRect.right)/2,
      y: clientAreaPos.y - (cardRect.top  + cardRect.bottom)/2
    };

    //scale coords
    [cardCenteredPos.x, cardCenteredPos.y] = 
      [cardCenteredPos.x, cardCenteredPos.y].map((i) => { return i / cardRadius; }) as [x: number, y: number];
    
    return cardCenteredPos;
  }

  const rotation = calcRotation(cursorGhost)

  return (
    <div className="flex h-full perspective-origin-center perspective-1000">
      <div 
        className={"max-w-xs justify-center rounded-lg px-2 py-4 shadow border-2 transform-style-3d"}
        style         = { {transform: `rotate3d(${rotation.x}, ${rotation.y}, 0, ${rotation.magnitude}deg)`} } 
        onMouseMove   = { handleMouseMove }
        onTouchMove   = { handleTouchMove }
        onMouseLeave  = { () => {setCursor(defaultPosition)} }
        onTouchEnd    = { () => {setCursor(defaultPosition)} }
        onTouchCancel = { () => {setCursor(defaultPosition)} }  
      >
        
        <div className="space-y-4">
          <CommitteeImage
            alt={`Profilbild på ${nickName ? `"${nickName}"` : name || ""}`}
            filename={image}
          />
          <div className="space-y-1.5">
            <h2 className="text-lg font-medium leading-none">{nickName || name}</h2>
            <h3 className="text-sm font-normal leading-none">
              {nickName && name ? name : " "}
            </h3>
            <p className="text-sm font-light leading-tight">{role}</p>
            {email && (
              <a
                className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
                href={`mailto:${email}`}
              >
                <AiOutlineMail className="mr-2 inline-block" size={16} />
                {email}
              </a>
            )}
            {phone && (
              <a
                className="block text-xs font-extralight leading-tight underline decoration-black underline-offset-2"
                href={`tel:${phone}`}
              >
                <AiOutlinePhone className="mr-2 inline-block" size={16} />
                {phone}
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )




};
