import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

export const YouTubePlayer = ({
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
  const [videoId, setVideoId] = useState('');
  const playerRef = useRef<YouTube>(null);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setIsLoading(false);
    const videoData = event.target.getVideoData() as {
      title: string;
      video_id: string;
    };
    setVideoId(videoData.video_id);
    getValues({ title: videoData.title, videoId: videoData.video_id });
  };

  // const onPlayerChange: YouTubeProps['onStateChange'] = (event) => {
  //   console.log(event.target);
  // };

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      listType: 'playlist',
      list: playlistId,
      controls: 0,
      rel: 0,
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
    <div className="w-full h-full flex justify-center items-center scale-150 before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-primary-color before:opacity-70 brightness-125">
      <YouTube
        opts={opts}
        onReady={onPlayerReady}
        // onStateChange={onPlayerChange}
        ref={playerRef}
      />
      {videoId && (
        <img
          className="select-none"
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        ></img>
      )}
    </div>
  );
};
