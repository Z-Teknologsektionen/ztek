"use client";
import type {
  FC,
  MouseEventHandler,
  MutableRefObject,
  PropsWithChildren,
  Touch,
  TouchEventHandler,
} from "react";
import { useEffect, useRef, useState } from "react";
const { exp, sqrt, min } = Math;

type Rotation = {
  magnitude: number;
  x: number;
  y: number;
};

type TiltAnimationContainerProps = PropsWithChildren;

export const TiltAnimationContainer: FC<TiltAnimationContainerProps> = ({
  children,
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
        className="justify-center transform-style-3d"
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
        {children}
      </div>
    </div>
  );
};
