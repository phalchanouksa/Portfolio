class MusicPlayer {
    constructor() {
        // Use singleton pattern to ensure only one instance exists
        if (window.musicPlayerInstance) {
            return window.musicPlayerInstance;
        }

        // Initialize with stored state or defaults
        this.songs = [];
        this.currentSongIndex = parseInt(localStorage.getItem('music-currentSongIndex')) || 0;
        this.isPlaying = localStorage.getItem('music-isPlaying') === 'true';
        
        // Use global audio instance if exists, otherwise create new
        this.audio = window.globalAudioPlayer || new Audio();
        window.globalAudioPlayer = this.audio;
        
        // Set volume to 40%
        this.audio.volume = 0.4;
        
        // Save instance globally
        window.musicPlayerInstance = this;
        
        // Initialize
        this.init();

        // Save state before page unload
        window.addEventListener('beforeunload', () => this.saveState());
        // Handle visibility changes
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    saveState() {
        localStorage.setItem('music-currentSongIndex', this.currentSongIndex);
        localStorage.setItem('music-currentTime', this.audio.currentTime);
        localStorage.setItem('music-isPlaying', !this.audio.paused);
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is being hidden, save state
            this.saveState();
        } else {
            // Page is being shown, check if we should resume
            if (this.isPlaying) {
                this.audio.play().catch(() => {
                    // Autoplay might be blocked
                    console.warn('Autoplay blocked by browser');
                });
            }
        }
    }

    async init() {
        await this.loadPlaylist();
        this.createPlayer();
        this.initDraggable();
        this.initAudioEvents();
        
        // Restore state
        const lastTime = parseFloat(localStorage.getItem('music-currentTime')) || 0;
        this.loadSong();
        this.audio.currentTime = lastTime;
        if (this.isPlaying) {
            this.audio.play().catch(() => {
                // Autoplay might be blocked
                this.isPlaying = false;
                this.updatePlayButton();
            });
        }
    }

    async loadPlaylist() {
        try {
            const response = await fetch('public/song/playlist.json');
            if (!response.ok) throw new Error('Failed to load playlist');
            const data = await response.json();
            this.songs = data.songs;
        } catch (error) {
            console.error('Error loading playlist:', error);
            // Fallback to hardcoded songs if playlist.json fails to load
            this.songs = [
                {
                    title: "So Far Away",
                    path: "public/song/So far away.mp3"
                },
                {
                    title: "Suzume Theme Song",
                    path: "public/song/Suzume_no_TojimariSuzume_Theme_Song.mp3"
                },
                {
                    title: "悲恋白書",
                    path: "public/song/悲恋白書（ひれんはくしょ.mp3"
                }
            ];
        }
    }

    createPlayer() {
        const player = document.createElement('div');
        player.className = 'music-player';
        player.innerHTML = `
            <div class="music-player-header">
                <h3 class="music-player-title">Select Track</h3>
                <div>
                    <button class="music-player-button" id="minimize-player" title="Minimize">_</button>
                    <button class="music-player-button" id="close-player" title="Close">×</button>
                </div>
            </div>
            <div class="music-player-controls">
                <button class="music-player-button" id="prev-song" title="Previous">⏮</button>
                <button class="music-player-button" id="play-pause" title="Play/Pause">▶</button>
                <button class="music-player-button" id="next-song" title="Next">⏭</button>
            </div>
            <div class="music-player-progress">
                <div class="music-player-progress-bar"></div>
            </div>
            <div class="music-player-time">
                <span id="current-time">0:00</span>
                <span id="total-time">0:00</span>
            </div>
            <div class="music-player-playlist">
                ${this.songs.map((song, index) => `
                    <div class="music-player-playlist-item${index === 0 ? ' active' : ''}" data-index="${index}">
                        ${song.title}
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(player);
        this.bindEvents();
    }

    initDraggable() {
        const player = document.querySelector('.music-player');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        player.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('music-player-button')) return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === player || e.target.closest('.music-player-header')) {
                isDragging = true;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            player.style.transform = `translate(${currentX}px, ${currentY}px)`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    bindEvents() {
        const playPauseBtn = document.getElementById('play-pause');
        const prevBtn = document.getElementById('prev-song');
        const nextBtn = document.getElementById('next-song');
        const minimizeBtn = document.getElementById('minimize-player');
        const closeBtn = document.getElementById('close-player');
        const progressBar = document.querySelector('.music-player-progress');
        const playlist = document.querySelector('.music-player-playlist');

        playPauseBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.prevSong());
        nextBtn.addEventListener('click', () => this.nextSong());
        minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        closeBtn.addEventListener('click', () => this.close());
        
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = this.audio.duration * percent;
        });

        playlist.addEventListener('click', (e) => {
            const item = e.target.closest('.music-player-playlist-item');
            if (!item) return;
            
            const index = parseInt(item.dataset.index);
            if (index !== this.currentSongIndex) {
                this.currentSongIndex = index;
                this.loadAndPlaySong();
            }
        });
    }

    initAudioEvents() {
        this.audio.addEventListener('timeupdate', () => {
            const currentTime = document.getElementById('current-time');
            const totalTime = document.getElementById('total-time');
            const progressBar = document.querySelector('.music-player-progress-bar');
            
            if (currentTime && totalTime && progressBar) {
                currentTime.textContent = this.formatTime(this.audio.currentTime);
                totalTime.textContent = this.formatTime(this.audio.duration);
                
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Save current time periodically
                localStorage.setItem('music-currentTime', this.audio.currentTime);
            }
        });

        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
            localStorage.setItem('music-isPlaying', 'true');
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            localStorage.setItem('music-isPlaying', 'false');
        });

        this.audio.addEventListener('ended', () => {
            this.nextSong();
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
    }

    loadSong() {
        if (!this.songs.length) return;
        const song = this.songs[this.currentSongIndex];
        this.audio.src = song.path;
        
        const title = document.querySelector('.music-player-title');
        if (title) title.textContent = song.title;
        
        // Update playlist active state
        document.querySelectorAll('.music-player-playlist-item').forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSongIndex);
        });

        // Save current song index
        localStorage.setItem('music-currentSongIndex', this.currentSongIndex);
    }

    loadAndPlaySong() {
        this.loadSong();
        this.audio.play().catch(() => {
            // Handle autoplay blocking
            console.warn('Autoplay blocked by browser');
            this.isPlaying = false;
            this.updatePlayButton();
        });
    }

    updatePlayButton() {
        const playPauseBtn = document.getElementById('play-pause');
        if (playPauseBtn) {
            playPauseBtn.textContent = this.isPlaying ? '⏸' : '▶';
        }
    }

    nextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.loadSong();
        if (this.isPlaying) {
            this.audio.play().catch(() => {});
        }
    }

    prevSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        this.loadSong();
        if (this.isPlaying) {
            this.audio.play().catch(() => {});
        }
    }

    toggleMinimize() {
        const player = document.querySelector('.music-player');
        player.classList.toggle('minimized');
    }

    close() {
        this.audio.pause();
        document.querySelector('.music-player').remove();
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Export the class
export default MusicPlayer;
