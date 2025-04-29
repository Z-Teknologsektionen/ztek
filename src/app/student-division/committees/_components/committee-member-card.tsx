"use client";
import type {
  FC,
  MouseEventHandler,
  MutableRefObject,
  Touch,
  TouchEventHandler,
} from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CommitteeImage } from "~/components/committees/committee-image";
const { exp, sqrt, min } = Math;

type CommitteeMemberCardProps = {
  email: string;
  image: string;
  name: string;
  nickName: string;
  phone: string;
  role: string;
};

type Rotation = {
  magnitude: number;
  x: number;
  y: number;
};

export const CommitteeMemberCard: FC<CommitteeMemberCardProps> = ({
  email,
  image,
  name,
  nickName,
  phone,
  role,
}) => {
  //behavioral constants
  const defaultPosition = { x: 0, y: 0 }; // logical cursor position when not hovering card
  const animationDuration = 1000; // duration after last interaction until animation is turned off for performance

  //state
  const [cursorCurrent, setCursorCurrent] = useState(defaultPosition);
  const [cursorGhost, setCursorGhost] = useState(defaultPosition);

  //animation state
  const [animating, setAnimating] = useState(false);
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [lastInteractedTime, setLastInteractedTime] = useState(0);
  const animationFrameRef: MutableRefObject<number | undefined> = useRef();

  //animation
  const animate = (now: DOMHighResTimeStamp): void => {
    //RUNS AT: Conditionally at an arbitrary fixed duration past render. Will cause new render.
    updateGhost(now - lastFrameTime);
    setLastFrameTime(now);
    if (now - lastInteractedTime > animationDuration) setAnimating(false);
  };
  useEffect(() => {
    //RUNS AT: After every render
    if (animating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  });

  //HANDLER: Hover with mouse or stylus
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const cursor = localizePos({ x: e.clientX, y: e.clientY }, e.currentTarget);
    setCursorCurrent(cursor);
    setAnimating(true);
    setLastInteractedTime(lastFrameTime);
  };

  //HANDLER: Press and hold with finger or stylus
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch: Touch | undefined = e.targetTouches[0]; //discard other fingers
    if (touch) {
      const cursor = localizePos(
        { x: touch.clientX, y: touch.clientY },
        e.currentTarget,
      );
      cursor.y = cursor.x ** 3; //y not inputable on mobile devices due to scroll interference, calculate as function of x instead
      setCursorCurrent(cursor);
      setAnimating(true);
      setLastInteractedTime(lastFrameTime);
    }
  };

  //linearly interpolate cursor
  const updateGhost = (deltaTime: DOMHighResTimeStamp): void => {
    const regulatorFactor = -0.1;
    const cursorDelta = {
      x: cursorCurrent.x - cursorGhost.x,
      y: cursorCurrent.y - cursorGhost.y,
    };
    const newCursorGhost = {
      x: cursorGhost.x + cursorDelta.x * exp(regulatorFactor * deltaTime),
      y: cursorGhost.y + cursorDelta.y * exp(regulatorFactor * deltaTime),
    };

    setCursorGhost(newCursorGhost);
  };

  // Rotation from (card local) cursor pos
  const calcRotation = (cursor: { x: number; y: number }): Rotation => {
    const angleCoefficient = 30;
    const maxAngle = 40;
    const angle = min(
      maxAngle,
      angleCoefficient * sqrt(cursor.x ** 2 + cursor.y ** 2),
    );
    return { x: cursor.y, y: cursor.x * -1, magnitude: angle };
  };

  // Card local pos from global (aka browser viewport) pos
  const localizePos = (
    clientAreaPos: { x: number; y: number },
    targetedCard: HTMLDivElement,
  ): { x: number; y: number } => {
    //card size
    const cardRect = targetedCard.getBoundingClientRect();
    const cardRadius =
      Math.sqrt(cardRect.height ** 2 + cardRect.width ** 2) / 2;

    //translate coords
    const cardCenteredPos = {
      x: clientAreaPos.x - (cardRect.left + cardRect.right) / 2,
      y: clientAreaPos.y - (cardRect.top + cardRect.bottom) / 2,
    };

    //scale coords
    [cardCenteredPos.x, cardCenteredPos.y] = [
      cardCenteredPos.x,
      cardCenteredPos.y,
    ].map((i) => {
      return i / cardRadius;
    }) as [x: number, y: number];

    return cardCenteredPos;
  };

  //return jsx
  const rotation = calcRotation(cursorGhost);
  return (
    <div className="flex h-full perspective-1000 perspective-origin-center">
      <div
        className={
          "max-w-xs justify-center rounded-lg border-2 px-2 py-4 shadow transform-style-3d"
        }
        onMouseLeave={() => {
          setCursorCurrent(defaultPosition);
        }}
        onMouseMove={handleMouseMove}
        onTouchCancel={() => {
          setCursorCurrent(defaultPosition);
        }}
        onTouchEnd={() => {
          setCursorCurrent(defaultPosition);
        }}
        onTouchMove={handleTouchMove}
        style={{
          transform: `rotate3d(${rotation.x}, ${rotation.y}, 0, ${rotation.magnitude}deg)`,
        }}
      >
        <div className="space-y-4">
          <CommitteeImage
            alt={`Profilbild på ${nickName ? `"${nickName}"` : name || ""}`}
            filename={image}
          />
          <div className="space-y-1.5">
            <h2 className="text-lg font-medium leading-none">
              {nickName || name}
            </h2>
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
  );
};
