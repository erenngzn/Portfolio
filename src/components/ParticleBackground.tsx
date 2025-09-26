import React, { useEffect, useRef } from 'react';

const ModernParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const numParticles = 75;

    // Parçacık sınıfı
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number, radius: number, color: string, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        // Her parçacığın rastgele bir açıda hareket etmesi için
        this.angle = Math.random() * 2 * Math.PI;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
      }

      // Parçacığı çizer
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // Parçacığın pozisyonunu günceller ve ekran sınırlarını kontrol eder
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Ekranın dışına çıkarsa, karşı taraftan tekrar girmesini sağlar
        if (canvas) {
            if (this.x < -this.radius) this.x = canvas.width + this.radius;
            if (this.x > canvas.width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = canvas.height + this.radius;
            if (this.y > canvas.height + this.radius) this.y = -this.radius;
        }


        this.draw();
      }
    }

    // Parçacıkları oluşturur
    const init = () => {
      particles = [];
      const colors = ['rgba(147, 197, 253, 0.7)', 'rgba(165, 180, 252, 0.7)', 'rgba(196, 181, 253, 0.7)'];
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * 2 + 1; // 1 ile 3 piksel arası yarıçap
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const speed = Math.random() * 0.3 + 0.1; // Yavaş ve sakin bir hız
        particles.push(new Particle(x, y, radius, color, speed));
      }
    };
    
    // Canvas boyutunu pencere boyutuna ayarlar
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Yeniden boyutlandırdıktan sonra parçacıkları yeniden başlat
    };


    let animationFrameId: number;
    // Animasyon döngüsü
    const animate = () => {
      // Her karede ekranı hafifçe silerek iz bırakma efekti oluşturur
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Her bir parçacığı günceller
      particles.forEach(particle => {
        particle.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    // Component kaldırıldığında animasyonu ve event listener'ı temizle
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Boş dependency array'i sayesinde bu effect sadece bir kere çalışır

  return (
    <canvas
      ref={canvasRef}
      // Tailwind CSS sınıfları ile canvas'ı arka plana sabitliyoruz
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ModernParticleBackground;
