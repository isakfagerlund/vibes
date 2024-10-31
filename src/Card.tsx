import { useRef } from 'react';
import { useDrag } from './useDrag';
import { useWindowSize } from 'usehooks-ts';

export const Card = ({
  children,
  title,
  windowWidth = 400,
  windowHeight = 400,
}: {
  children: React.ReactNode;
  title: string;
  windowWidth?: number;
  windowHeight?: number;
}) => {
  const draggableRef = useRef(null);
  const { width = 0, height = 0 } = useWindowSize();

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
    initialPosition: { x: width / 2 - 250, y: height / 2 - 100 },
    maxDragX: width - windowWidth,
    maxDragY: height - windowHeight,
  });

  return (
    <div
      className="draggable absolute border-4 border-primary-color rounded-2xl pt-[33px]"
      ref={draggableRef}
      style={{
        top: position.y,
        left: position.x,
        height: windowHeight,
        width: windowWidth,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="px-8 border-4 rounded-2xl left-[-4px] w-[calc(100%+8px)] h-[36 px] absolute top-[-4px] border-primary-color cursor-move flex justify-between items-center gap-2"
      >
        <p className="w-1/2  uppercase text-primary-color cherry-font">
          {title}
        </p>
        <hr className="w-1/2 border-b-4  rounded-full border-primary-color" />
      </div>
      {children}
    </div>
  );
};
