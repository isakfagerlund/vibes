import { Eyes } from './Eyes';
import { MusicPlayer } from './MusicPlayer';

function App() {
  return (
    <main className="w-full h-dvh relative p-8">
      <div className="flex flex-col items-center w-fit">
        <div className="cherry-font text-4xl text-primary-color">
          CAFE VIBES
        </div>
        <p className="bungee-font text-primary-color">MUSIC & TECH</p>
      </div>
      <div className="absolute top-8 right-8">
        <Eyes />
      </div>
      <MusicPlayer />
    </main>
  );
}

export default App;
