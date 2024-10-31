import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from './Card';
import { YouTubePlayer } from './YoutubePlayer';
import { PlayIcon } from './PlayIcon';

const chill_jazz = 'RDATgymX';
const jap_80 = 'PLFn4dkBSmLS3yXEJXQjvAGP0kV92KAJtq';

export const MusicPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  const [currentPlaylist, setCurrentPlaylist] = useState(chill_jazz);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [volume, setVolume] = useState(100);

  const [title, setTitle] = useState('');

  const getValues = (values: { title: string; videoId: string }) => {
    setTitle(values.title);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsPlaying((prevState) => !prevState);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      playerRef.current.classList.add('animate-record-spin');
      playerRef.current.style.animationPlayState = 'running';
    } else if (playerRef.current && !isPlaying) {
      playerRef.current.style.animationPlayState = 'paused';
    }
  }, [isPlaying]);

  return (
    <Card title="Music Player" windowHeight={500}>
      <div className="flex flex-col h-full justify-between p-4">
        <div className="w-full flex justify-center items-center">
          <div
            ref={playerRef}
            className="w-[200px] h-[200px] overflow-hidden rounded-full border-4 border-primary-color relative"
          >
            <YouTubePlayer
              playlistId={currentPlaylist}
              getValues={getValues}
              isPlaying={isPlaying}
              setIsLoading={setIsLoading}
              setIsPlaying={setIsPlaying}
              volume={100}
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[25px] h-[25px] bg-bg-color"></div>
          </div>
        </div>
        <ul className="flex flex-col justify-between">
          <p>Select your vibe</p>
          <li
            onClick={() => {
              setIsPlaying(false);
              setIsLoading(true);
              setCurrentPlaylist(chill_jazz);
            }}
            className={`cursor-pointer p-1 ${
              currentPlaylist === chill_jazz
                ? 'bg-slate-500 bg-opacity-20 '
                : ''
            }`}
          >
            Chill Jazz
          </li>
          <li
            onClick={() => {
              setIsPlaying(false);
              setIsLoading(true);
              setCurrentPlaylist(jap_80);
            }}
            className={`cursor-pointer p-1 ${
              currentPlaylist === jap_80 ? 'bg-slate-500 bg-opacity-20' : ''
            }`}
          >
            80s Japanese Pop
          </li>
        </ul>
        <div className="flex flex-col text-primary-color items-center gap-4">
          <p className="italic font-light">
            {isLoading ? 'Loading...' : title}
          </p>

          <span
            className="flex justify-center items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <PlayIcon isPlaying={isPlaying} />
          </span>
        </div>
      </div>
    </Card>
  );
};
