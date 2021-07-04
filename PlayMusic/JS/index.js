const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");

const btnPlay = $(".btn-toggle-play");
const player = $(".player");

const progress = $("#progress");

const btnNextSong = $(".btn-next");
const btnPrevSong = $(".btn-prev");

const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");

const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
        name: "Hẹn yêu",
        singer: "Zino",
        path: "./list-music/item_1.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/playlist/2018/06/04/e/b/a/d/1528101108415_500.jpg"
    }, {
        name: "Đường tôi chở em về",
        singer: "Bùi Tường Linh",
        path: "./list-music/item_2.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/playlist/2021/06/24/6/d/8/4/1624500316333_500.jpg"
    }, {
        name: "Kẻ mộng mơ",
        singer: "Hữu Duy",
        path: "./list-music/item_3.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2021/06/25/e/6/6/d/1624587165789_500.jpg"
    }, {
        name: "Bỏ lỡ nhau rồi",
        singer: "Hải Nam",
        path: "./list-music/item_4.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2021/06/25/e/6/6/d/1624587213651_500.jpg"
    }, {
        name: "Mình anh nơi này",
        singer: "FIT",
        path: "./list-music/item_5.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/04/19/0/c/1/d/1524133449013_600.jpg"
    }, {
        name: "Răng khôn",
        singer: "Phí Phương Anh",
        path: "./list-music/item_6.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2021/04/19/d/1/f/1/1618810475930_500.jpg"
    }, {
        name: "Giữ riêng anh",
        singer: "Thanh Bình",
        path: "./list-music/item_7.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2020/11/23/0/2/3/c/1606127128841_500.jpg"
    }, {
        name: "Khi em lớn",
        singer: "Orange, Hoàng Dũng",
        path: "./list-music/item_8.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    }, {
        name: "Chúng ta sau này",
        singer: "T.R.I",
        path: "./list-music/item_9.mp3",
        image: "https://avatar-ex-swe.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661_500.jpg"
    }, {
        name: "Thì thôi",
        singer: "Hữu Duy",
        path: "./list-music/item_10.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    }],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `            
            <div class="song ${index==this.currentIndex ? 'active': ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        });
        playlist.innerHTML = htmls.join("")
    },
    handleEvent: function () {
        const cd = $(".cd");
        //0. Xử lý rote cd
        var cdThumbAnimate = cd.animate([{
            transform: "rotate(360deg)"
        }], {
            duration: 10000, // 10 second
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        console.log(cdThumbAnimate)
        //1. Xử lý Play

        btnPlay.onclick = function () {
            if (app.isPlaying) {
                audio.pause()

            }
            else {
                audio.play()
            }
        }
        audio.onplay = function () {
            app.isPlaying = true;
            player.classList.add("playing")
            cdThumbAnimate.play()
        }
        audio.onpause = function () {
            app.isPlaying = false;
            player.classList.remove("playing")
            cdThumbAnimate.pause()
        }
        //2. Xử lý chạy thanh progress bar
        audio.ontimeupdate = function () {
            var progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercent;
        }
        //3. Xử lý việc nhấn tua progress
        progress.onchange = function () {
            const seek = progress.value * audio.duration / 100;
            audio.currentTime = seek;
        }
        //4. Xử lý phóng to thu nhỏ
        const cdWidth = cd.offsetWidth // Lấy chiều rộng của thẻ div đó
        document.onscroll = function () {
            const scrollTop = window.screenY || document.documentElement.scrollTop;
            var newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth / cdWidth;

        }
        //5. Nhấn sang bài kế tiếp
        btnNextSong.onclick = function () {
            if (app.isRandom) {
                console.log(app.isRandom);
                app.randomSong();
            }
            else {
                app.nextSong();
            }

            audio.play();
            app.render();
            app.scrollToActiveView();
        }
        //6. Nhấn về bài trước đó
        btnPrevSong.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            }
            else {
                app.prevSong();
            }

            audio.play();
            app.render();
            app.scrollToActiveView();
        }
        //7. Random bài hát
        btnRandom.onclick = function () {
            app.isRandom = !app.isRandom;
            btnRandom.classList.toggle("active", app.isRandom);

        }
        //8. Next sang bài khác khi kết thúc
        audio.onended = function () {
            // app.nextSong();
            // audio.play();  
            if (app.isRepeat) {
                audio.play();
            } else {
                btnNextSong.click();
            }
        }
        //9. Repeat lại bài hát
        btnRepeat.onclick = function () {
            app.isRepeat = !app.isRepeat;
            btnRepeat.classList.toggle("active", app.isRepeat);
        }
        //10. scrollToActiveView: kéo về vị trí song đang active
        //11. Xử lý nhấn song muốn nghe
        playlist.onclick = function (e) {
            const node = e.target.closest('.song:not(.active)') ;
            if(node|| e.target.closest('.option')){
                app.currentIndex = node.dataset.index;
                app.loadCurrentSong();
              
                app.render();
                audio.play();
            }
        }
    },
    defineProperty: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    scrollToActiveView: function () {
       setTimeout(function () {
           $(".song.active").scrollIntoView({
               behavior: "smooth",
               block:"center"
           })
       }, 500)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.background = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            app.currentIndex = 0;
        }
        this.loadCurrentSong();

    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            app.currentIndex = app.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex == newIndex);
        console.log(newIndex)
        this.currentIndex = newIndex;
        app.loadCurrentSong()
    },
    start: function () {
        // Định nghĩa các thuộc tính
        this.defineProperty()

        // Xử lý dom event
        this.handleEvent()

        //Load currentSong
        this.loadCurrentSong()

        // Render ra màn hình
        this.render()
    }
}
app.start();