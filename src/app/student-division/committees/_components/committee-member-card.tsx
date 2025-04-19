
"use client";
import { MouseEventHandler, Touch, TouchEventHandler, useState, type FC } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CommitteeImage } from "~/components/committees/committee-image";

type CommitteeMemberCardProps = {
  email: string;
  image: string;
  name: string;
  nickName: string;
  phone: string;
  role: string;
};

export const CommitteeMemberCard: FC<CommitteeMemberCardProps> = ({
  email,
  image,
  name,
  nickName,
  phone,
  role,
}) => { 
  
  //state
  const defaultRoatation = {x: 0, y: 0, magnitude: 0};
  const [ rotation, setRotation ] = useState(defaultRoatation);
  
  const interact = (clientX: number, clientY: number, target: Element): void => {
    
    //card
    const cardRect = target.getBoundingClientRect();        
    const cardRadius = Math.sqrt(cardRect.height**2 + cardRect.width**2)/2;   

    //cursor
    var cursorPos = {                                       //card-relative (centered)
      x: clientX - (cardRect.left + cardRect.right)/2,
      y: clientY - (cardRect.top  + cardRect.bottom)/2
    };
    [cursorPos.x, cursorPos.y] = [cursorPos.x, cursorPos.y].map((i) => { return i / cardRadius; }) as [x: number, y: number]; //scale cursor pos to card

    //elevation angle
    const maxAngle = 30;
    const angle = maxAngle * Math.sqrt(cursorPos.x**2 + cursorPos.y**2);
    if (angle>2*maxAngle) console.log(cursorPos);
    
    setRotation({x: cursorPos.y, y: cursorPos.x *-1, magnitude: angle});
  }

  //Hover with mouse or stylus
  const handleMouseMove: MouseEventHandler<Element> = (e) => {
    interact(e.clientX, e.clientY, e.currentTarget);
  }

  //Press and hold with finger or stylus
  const handleTouchMove: TouchEventHandler<Element> = (e) => {
    const touch: Touch|undefined = e.targetTouches[0];  //discard but the first finger, or "first sylus???"... nvm
    if (touch) interact(touch.clientX, touch.clientY, e.currentTarget);
  }

  

  return (
    <div className="flex h-full perspective-origin-center perspective-1000">
      <div 
        className={"max-w-xs justify-center rounded-lg px-2 py-4 shadow border-2 transform-style-3d"}
        style={{transform: `rotate3d(${rotation.x}, ${rotation.y}, 0, ${rotation.magnitude}deg)`}} 
        onMouseMove={handleMouseMove}                           //mouse only
        onTouchMove={handleTouchMove}                           //touch only
        onPointerLeave={() => {setRotation(defaultRoatation)}}  //any pointing device
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
