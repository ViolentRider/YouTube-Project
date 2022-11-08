const API_KEY = "AIzaSyAye0TvRQpvYYJ1C_zgnDg7umAneVEiIqk";
const USER_ID =
  "286529760252-frdfk8m7komtdtgv6ihdpp7hd33arad0.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

function main() {
  // createChannelListIcons();
  scrollMouse();
  // youtubeIframeAPI();
  // onYouTubeIframeAPIReady();
}

async function getData() {
  const inputId = document.querySelector(".input-yt-id");
  const CHANNEL_ID = inputId.value;
  const URL =
    "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=" +
    CHANNEL_ID +
    "&maxResults=100&key=" +
    API_KEY;
  let res = await axios.get(URL);
  const resToArray = [];
  for (i = 0; i <= 49; i++) {
    resToArray.push(res.data.items[i].snippet);
  }
  return resToArray;
}
// async function createChannelDataArray() {
//   let res = await getData();
//   const resToArray = [];
//   for (i = 0; i <= 49; i++) {
//     resToArray.push(res.data.items[i].snippet);
//   }
//   return resToArray;
// }

async function createChannelListIcons() {
  const resToArray = await getData();
  const topSideChannelListBox = document.querySelector(
    ".top-side-channel-list"
  );

  for (i = 0; i <= 49; i++) {
    const channelIcon = document.createElement("img");
    topSideChannelListBox.append(channelIcon);
    channelIcon.classList.add(
      resToArray[i].title.replace(/\./g, "").replace(/\s+/g, "")
    );
    channelIcon.setAttribute(
      "alt",
      resToArray[i].title.replace(/\./g, "").replace(/\s+/g, "") + "-icon"
    );
    channelIcon.setAttribute("src", resToArray[i].thumbnails.default.url);
    channelIcon.setAttribute("id", resToArray[i].resourceId.channelId);
  }
  return resToArray;
}
const topSideContainer = document.querySelector(".top-side-channel-list");
function checkTopside(e) {
  if (e.target.getAttribute("id") !== null) {
    const videosBoxes = document.querySelectorAll(".video-box");
    videosBoxes.forEach((item) => item.remove());
    createVideoBox(e);
    console.log(e.target.getAttribute("id"));
  }
}
topSideContainer.addEventListener("click", checkTopside);

async function findChannelVideos(e) {
  const URL =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    API_KEY +
    "&channelId=" +
    e.target.getAttribute("id") +
    "&part=snippet,id&order=date&maxResults=20";
  const res = await axios.get(URL);
  const videos = [res.data.items];
  return videos;
}

async function youtubeIframeAPI() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

async function createVideoBox(e) {
  const videos = await findChannelVideos(e);
  console.log(videos);
  for (i = 0; i <= 1; i++) {
    const videosContainer = document.querySelector(".videos-container");
    const videoBox = document.createElement("div");
    videoBox.classList.add("video-box");
    videosContainer.append(videoBox);

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("video-img");
    playerDiv.style.backgroundImage = `url(${videos[0][i].snippet.thumbnails.high.url})`;
    playerDiv.setAttribute("id", videos[0][i].id.videoId);
    videoBox.append(playerDiv);

    const videoInfo = document.createElement("div");
    videoInfo.classList.add("video-info");
    videoBox.append(videoInfo);

    const videoTitle = document.createElement("h3");
    let item = document.querySelector(
      `.${videos[0][0].snippet.channelTitle
        .replace(/\./g, "")
        .replace(/\s+/g, "")}`
    );
    // console.log(item.getAttribute("src"));
    videoTitle.textContent = videos[0][i].snippet.title;
    videoInfo.append(videoTitle);

    const author = document.createElement("p");
    author.innerHTML = `<img src = '${item.getAttribute("src")}'> ${
      videos[0][i].snippet.channelTitle
    }`;
    author.style;
    videoInfo.append(author);

    const publishingdate = document.createElement("p");
    publishingdate.textContent = videos[0][i].snippet.publishTime.slice(0, 10);
    videoInfo.append(publishingdate);

    // videos[0][i].id.videoId = new YT.Player(`${videos[0][i].id.videoId}`, {
    //   videoId: videos[0][i].id.videoId,
    // });
  }
}

const inputIdBtn = document.querySelector(".yt-id-input-btn");
inputIdBtn.addEventListener("click", createChannelListIcons);

function displayVideo(e) {
  if (e.target.matches(".video-img")) {
    const videoId = e.target.getAttribute("id");
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player(`${videoId}`, {
        height: "360",
        width: "640",
        videoId: `${videoId}`,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
    onYouTubeIframeAPIReady();
    function onPlayerReady(event) {
      event.target.playVideo();
    }
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }
  } else if (e.target.matches(".modal")) {
    modal.style.display = "none";
  }
}

function scrollMouse() {
  const scrollContainer = document.querySelector(".top-side-channel-list");

  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  });
}
document.addEventListener("click", displayVideo);
document.addEventListener("DOMContentLoaded", main);

//pobiera id z inputu ; przekierowac response do funkcji pozostalych !!!!!!!!!!!!!!!!!!!
//UCaAqWToMsQFViH2dufxwN7Q
