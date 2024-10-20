import { PauseCircle, PlayCircle } from 'lucide-react';

export const PlayIcon = ({ isPlaying }: { isPlaying: boolean }) =>
  !isPlaying ? (
    <PlayCircle
      color="var(--primary-color)"
      className="size-8 hover:scale-105 transition-all"
    />
  ) : (
    <PauseCircle
      color="var(--primary-color)"
      className="size-8 hover:scale-105 transition-all"
    />
  );
