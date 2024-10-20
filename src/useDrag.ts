import { useCallback, useEffect, useState, RefObject } from 'react';

interface DragInfo {
  startX: number;
  startY: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

interface UseDragProps {
  ref: RefObject<HTMLElement>;
  calculateFor?: 'topLeft' | 'bottomRight';
  initialPosition?: Position;
  maxDragX?: number;
  maxDragY?: number;
}

export const useDrag = ({
  ref,
  calculateFor = 'topLeft',
  initialPosition,
  maxDragX = Infinity,
  maxDragY = Infinity,
}: UseDragProps) => {
  const [dragInfo, setDragInfo] = useState<DragInfo | undefined>();
  const [finalPosition, setFinalPosition] = useState<Position>(
    initialPosition ?? { x: 0, y: 0 }
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const updateFinalPosition = useCallback(
    (width: number, height: number, x: number, y: number) => {
      if (calculateFor === 'bottomRight') {
        setFinalPosition({
          x: Math.max(
            Math.min(
              window.innerWidth - width,
              window.innerWidth - (x + width),
              maxDragX
            ),
            0
          ),
          y: Math.max(
            Math.min(
              window.innerHeight - height,
              window.innerHeight - (y + height),
              maxDragY
            ),
            0
          ),
        });

        return;
      }

      setFinalPosition({
        x: Math.min(
          Math.max(0, x),
          Math.min(window.innerWidth - width, maxDragX)
        ),
        y: Math.min(
          Math.max(0, y),
          Math.min(window.innerHeight - height, maxDragY)
        ),
      });
    },
    [calculateFor, maxDragX, maxDragY]
  );

  const handleMouseUp = (evt: MouseEvent) => {
    evt.preventDefault();

    setIsDragging(false);
  };

  const handleMouseDown = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    const { clientX, clientY } = evt;
    const draggableElement = ref.current;

    if (!draggableElement) {
      return;
    }

    const { top, left, width, height } =
      draggableElement.getBoundingClientRect();

    setIsDragging(true);
    setDragInfo({
      startX: clientX,
      startY: clientY,
      top,
      left,
      width,
      height,
    });
  };

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      const draggableElement = ref.current;

      if (!isDragging || !draggableElement || !dragInfo) return;

      evt.preventDefault();

      const { clientX, clientY } = evt;

      const position = {
        x: dragInfo.startX - clientX,
        y: dragInfo.startY - clientY,
      };

      const { top, left, width, height } = dragInfo;

      updateFinalPosition(width, height, left - position.x, top - position.y);
    },
    [isDragging, dragInfo, ref, updateFinalPosition]
  );

  const recalculate = (width?: number, height?: number) => {
    const draggableElement = ref.current;
    if (!draggableElement) return;

    const {
      top,
      left,
      width: boundingWidth,
      height: boundingHeight,
    } = draggableElement.getBoundingClientRect();

    updateFinalPosition(
      width ?? boundingWidth,
      height ?? boundingHeight,
      left,
      top
    );
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove]);

  return {
    position: finalPosition,
    handleMouseDown,
    recalculate,
  };
};
