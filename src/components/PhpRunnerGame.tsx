import React, { useRef, useEffect, useState } from 'react';

interface PhpRunnerGameProps {
  onClose: () => void;
}

export const PhpRunnerGame: React.FC<PhpRunnerGameProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/assets/sprites/php.png';
    img.crossOrigin = 'anonymous';

    let x = 50;
    let y = 0;
    let velocity = 0;
    let gravity = 1;
    let isJumping = false;
    let phpWidth = 80;
    let phpHeight = 80;

    const groundY = canvas.height - 100;

    let obstacles: { x: number; width: number; height: number; passed?: boolean }[] = [];

    const resetGame = () => {
      x = 50;
      y = groundY - phpHeight;
      velocity = 0;
      isJumping = false;
      setScore(0);
      obstacles = [];
      setGameOver(false);
      update();
    };

    const jump = () => {
      if (!isJumping && !gameOver) {
        isJumping = true;
        velocity = 18;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') jump();
    };
    const handleTouch = () => jump();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('mousedown', handleTouch);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Personagem (PHP)
      if (img.complete) {
        ctx.save();
        ctx.translate(x + phpWidth, y);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, img.width, img.height, -phpWidth, 0, phpWidth, phpHeight);
        ctx.restore();
      }

      // Obstáculos
      ctx.fillStyle = 'red';
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
      });

      // Pontuação
      ctx.fillStyle = 'white';
      ctx.font = '20px monospace';
      ctx.fillText(`Pulos certos: ${score}`, 20, 40);
    };

    const update = () => {
      if (gameOver) return;

      // Pulo
      if (isJumping) {
        velocity -= gravity;
        y -= velocity;
        if (y >= groundY - phpHeight) {
          y = groundY - phpHeight;
          isJumping = false;
          velocity = 0;
        }
      }

      // Obstáculos
      obstacles.forEach((obs) => {
        obs.x -= 5;

        // Colisão
        const hit =
          x + phpWidth > obs.x &&
          x < obs.x + obs.width &&
          y + phpHeight > groundY - obs.height;

        if (hit) {
          setGameOver(true);
        }

        // Pulou com sucesso
        if (!obs.passed && obs.x + obs.width < x) {
          obs.passed = true;
          setScore((prev) => prev + 1);
        }
      });

      // Limpa fora da tela
      obstacles = obstacles.filter((obs) => obs.x + obs.width > 0);

      // Novo obstáculo
      if (Math.random() < 0.02) {
        const width = 40 + Math.random() * 20;
        const height = 40 + Math.random() * 30;
        const lastX = obstacles.length > 0 ? obstacles[obstacles.length - 1].x : 0;
        if (canvas.width - lastX > 250) {
          obstacles.push({ x: canvas.width + 100, width, height });
        }
      }

      draw();
      requestAnimationFrame(update);
    };

    img.onload = () => {
      y = groundY - phpHeight;
      update();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousedown', handleTouch);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full">
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-70 z-20 flex flex-col items-center justify-center space-y-4">
          <p className="text-white text-2xl">Game Over!</p>
          <p className="text-white text-lg">Pontuação: {score}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Jogar Novamente
          </button>
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-30 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Fechar
      </button>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-full h-full touch-none"
      />
    </div>
  );
};