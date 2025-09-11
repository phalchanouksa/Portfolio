class Visualizer {
    constructor(audioElement, canvasElement) {
        if (!audioElement || !canvasElement) {
            throw new Error('Audio element and canvas element are required.');
        }

        this.canvas = canvasElement;
        this.canvasCtx = this.canvas.getContext('2d');
        this.audioElement = audioElement;
        this.animationFrameId = null;

        // Set canvas dimensions
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        // Web Audio API setup
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 512; // Smoother wave
        this.analyser.smoothingTimeConstant = 0.8; // More fluid movement
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        // Connect audio source
        try {
            this.source = this.audioCtx.createMediaElementSource(this.audioElement);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioCtx.destination);
        } catch (error) {
            console.error('Error connecting audio source for visualizer:', error);
        }

        this.draw();
    }

    draw() {
        this.analyser.getByteFrequencyData(this.dataArray);
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const bufferLength = this.analyser.frequencyBinCount;
        const sliceWidth = this.canvas.width * 1.0 / bufferLength;
        let x = 0;

        // Create a gradient for the wave
        const gradient = this.canvasCtx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradient.addColorStop(0, 'rgba(154, 164, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 179, 193, 0.8)');

        this.canvasCtx.lineWidth = 2;
        this.canvasCtx.strokeStyle = gradient;
        this.canvasCtx.shadowBlur = 5;
        this.canvasCtx.shadowColor = 'rgba(200, 200, 255, 0.5)';

        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(0, this.canvas.height / 2);

        for (let i = 0; i < bufferLength; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * this.canvas.height / 2;

            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.canvasCtx.stroke();

        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    start() {
        if (!this.animationFrameId) {
            this.draw();
        }
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}

export default Visualizer;
