import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDrag } from './useDrag';
import { PlayIcon } from './PlayIcon';
import { useWindowSize } from 'usehooks-ts';

const chill_jazz = 'RDATgymX';
const jap_80 = 'PLFn4dkBSmLS3yXEJXQjvAGP0kV92KAJtq';

const YouTubePlayer = ({
  playlistId,
  getValues,
  isPlaying,
  setIsLoading,
  // setIsPlaying,
  volume,
}: {
  playlistId: string;
  getValues: (values: { title: string; videoId: string }) => void;
  isPlaying: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  volume: number;
}) => {
  const playerRef = useRef<YouTube>(null);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setIsLoading(false);
    const videoData = event.target.getVideoData() as {
      title: string;
      video_id: string;
    };
    getValues({ title: videoData.title, videoId: videoData.video_id });
  };

  const onPlayerChange: YouTubeProps['onStateChange'] = (event) => {
    console.log(event.target);
  };

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      listType: 'playlist',
      list: playlistId,
    },
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.playVideo();
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };

  const setVolume = (volume: number) => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.setVolume(volume);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [isPlaying]);

  useEffect(() => {
    setVolume(volume);
  }, [volume]);

  return (
    <YouTube
      opts={opts}
      onReady={onPlayerReady}
      onStateChange={onPlayerChange}
      ref={playerRef}
    />
  );
};

function App() {
  const { width = 0, height = 0 } = useWindowSize();
  const [currentPlaylist, setCurrentPlaylist] = useState(chill_jazz);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(100);
  const draggableRef = useRef(null);

  const { position, handleMouseDown } = useDrag({
    ref: draggableRef,
    initialPosition: { x: width / 2 - 250, y: height / 2 - 100 },
    maxDragX: width - 500,
    maxDragY: height - 200,
  });

  const [title, setTitle] = useState('');

  const getValues = (values: { title: string; videoId: string }) => {
    setTitle(values.title);
  };

  return (
    <main className="w-full h-dvh relative p-8">
      <div className="puff-font text-4xl text-primary-color">CAFE VIBES</div>
      <div className="absolute top-8 right-8">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
      <div
        className="draggable absolute"
        ref={draggableRef}
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        <div className="rounded-lg border border-primary-color flex flex-col bg-white w-[500px] fixed">
          <div
            onMouseDown={handleMouseDown}
            className="h-5 bg-primary-color rounded-t border border-primary-color cursor-move"
          ></div>
          <YouTubePlayer
            playlistId={currentPlaylist}
            getValues={getValues}
            isPlaying={isPlaying}
            setIsLoading={setIsLoading}
            setIsPlaying={setIsPlaying}
            volume={volume}
          />
          <div className="flex flex-col h-full justify-between">
            <div className="p-4">
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
                    currentPlaylist === jap_80
                      ? 'bg-slate-500 bg-opacity-20'
                      : ''
                  }`}
                >
                  80s Japanese Pop
                </li>
              </ul>
              <div>
                {isLoading ? 'Loading...' : <p>Now playing: {title}</p>}
                <span
                  className="flex justify-center items-center"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <PlayIcon isPlaying={isPlaying} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
