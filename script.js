const API_KEY = "AIzaSyAye0TvRQpvYYJ1C_zgnDg7umAneVEiIqk";
const USER_ID =
  "286529760252-frdfk8m7komtdtgv6ihdpp7hd33arad0.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

async function main() {
  createChannelListIcons();
  scrollMouse();
  youtubeIframeAPI();
}

async function getData() {
  const CHANNEL_ID = "UCaAqWToMsQFViH2dufxwN7Q";
  const URL =
    "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=" +
    CHANNEL_ID +
    "&maxResults=100&key=" +
    API_KEY;
  let res = await axios.get(URL);
  return res;
}
async function createChannelDataArray() {
  let res = await getData();
  const resToArray = [];
  for (i = 0; i <= 49; i++) {
    resToArray.push(res.data.items[i].snippet);
  }
  return resToArray;
}

async function createChannelListIcons() {
  const resToArray = await createChannelDataArray();
  const topSideChannelListBox = document.querySelector(
    ".top-side-channel-list"
  );

  for (i = 0; i <= 49; i++) {
    const channelIcon = document.createElement("img");
    topSideChannelListBox.append(channelIcon);
    channelIcon.classList.add(resToArray[i].title.replace(/\s+/g, ""));
    channelIcon.setAttribute(
      "alt",
      resToArray[i].title.replace(/\s+/g, "") + "-icon"
    );
    channelIcon.setAttribute("src", resToArray[i].thumbnails.default.url);
  }
}

async function findChannelVideos() {
  const URL =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    API_KEY +
    "&channelId=" +
    "UC-9PtvEZ0P2kSYtSZKlKyRg" +
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

async function onYouTubeIframeAPIReady() {
  const videos = await findChannelVideos();
  console.log(videos);
  for (i = 0; i <= 12; i++) {
    const videosContainer = document.querySelector(".videos-container");
    const videoBox = document.createElement("div");
    videoBox.classList.add("video-box");
    videosContainer.append(videoBox);

    const playerDiv = document.createElement("div");
    playerDiv.classList.add("video-img");
    playerDiv.setAttribute("id", videos[0][i].id.videoId);
    videoBox.append(playerDiv);

    const videoInfo = document.createElement("div");
    videoInfo.classList.add("video-info");
    videoBox.append(videoInfo);

    const videoTitle = document.createElement("h2");
    videoTitle.textContent = videos[0][i].snippet.title;
    videoInfo.append(videoTitle);

    const author = document.createElement("p");
    author.textContent = videos[0][i].snippet.channelTitle;
    videoInfo.append(author);

    const publishingdate = document.createElement("p");
    publishingdate.textContent = videos[0][i].snippet.publishTime.slice(0, 10);
    videoInfo.append(publishingdate);

    videos[0][i].id.videoId = new YT.Player(`${videos[0][i].id.videoId}`, {
      videoId: videos[0][i].id.videoId,
    });
  }
}

function scrollMouse() {
  const scrollContainer = document.querySelector(".top-side-channel-list");

  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  });
}
document.addEventListener("DOMContentLoaded", main);
