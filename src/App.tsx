import { Card } from './Card';
import { Eyes } from './Eyes';
import { MusicPlayer } from './MusicPlayer';
import { WindowOnTopProvider } from './useWindowOnTop';

function App() {
  return (
    <WindowOnTopProvider>
      <main className="w-full h-dvh relative p-1">
        <header className="w-full p-8 flex justify-center md:justify-between">
          <div className="flex flex-col items-center w-fit">
            <div className="cherry-font text-4xl text-primary-color">
              CAFE VIBES
            </div>
            <p className="bungee-font text-primary-color">MUSIC & TECH</p>
          </div>
          <div className="hidden md:block absolute top-8 right-8">
            <Eyes />
          </div>
        </header>
        {/* Draggable area */}
        <div className="w-full h-[calc(100%-128px)] relative">
          <MusicPlayer />
          <Card
            windowWidth={200}
            windowHeight={200}
            startPosition={{ x: 300, y: 300 }}
            title="Hello"
          >
            <p>Hello</p>
          </Card>
        </div>
      </main>
    </WindowOnTopProvider>
  );
}

export default App;
