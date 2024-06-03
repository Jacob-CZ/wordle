export default function Warn() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen fixed top-0 left-0 bg-black z-50">
      <h1 className="text-4xl">Warning</h1>
      <p className="text-lg">
        Come back tomorrow to play again!
      </p>
    </div>
  );
}