import Draggable from 'react-draggable';
import { useWindowOnTop } from './useWindowOnTop';

export const Card = ({
  children,
  title,
  windowWidth = 400,
  windowHeight = 400,
  startPosition = { x: 0, y: 0 },
}: {
  children: React.ReactNode;
  title: string;
  windowWidth?: number;
  windowHeight?: number;
  startPosition?: { x: number; y: number };
}) => {
  const { windowOnTop, setWindowOnTop } = useWindowOnTop();

  return (
    <Draggable
      onStart={() => setWindowOnTop(title)}
      defaultPosition={startPosition}
      bounds="parent"
    >
      <div
        style={{
          height: windowHeight,
          width: windowWidth,
          zIndex: windowOnTop === title ? 1000 : undefined,
        }}
        className="draggable absolute border-4 border-primary-color rounded-2xl pt-[33px] bg-bg-color"
      >
        <div className="px-8 border-4 rounded-2xl left-[-4px] w-[calc(100%+8px)] h-[36 px] absolute top-[-4px] border-primary-color cursor-move flex justify-between items-center gap-2">
          <p className="w-1/2  uppercase text-primary-color cherry-font">
            {title}
          </p>
          <hr className="w-1/2 border-b-4  rounded-full border-primary-color" />
        </div>
        {children}
      </div>
    </Draggable>
  );
};
