import styles from './Announcements.module.css'

const DEFAULT_THEME = 'white';
const THEME_LIST = [DEFAULT_THEME, 'blue'];

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function getTheme(theme) {
  if (isDefined(theme) && THEME_LIST.includes(theme))
    return theme;

  return DEFAULT_THEME;
}

function sortListByReverseOrder(list) {
  return list.sort((a, b) => b.reverseOrder - a.reverseOrder);
}

function getAnnouncementsById(id) {
  return document.getElementById(`${id}Announcements`);
}

function getMoreById(id) {
  return document.getElementById(`${id}MorePosts`);
}

function getLessById(id) {
  return document.getElementById(`${id}LessPosts`);
}

function moreIsActive(id) {
  const more = getMoreById(id);
  if (more.classList.contains('active'))
    return true;

  return false;
}

function lessIsActive(id) {
  const less = getLessById(id);
  if (less.classList.contains('active'))
    return true;

  return false;
}

function activateMore(id) {
  const more = getMoreById(id);
  more.classList.add('active');
}

function activateLess(id) {
  const less = getLessById(id);
  less.classList.add('active');
}

function deactivateMore(id) {
  const more = getMoreById(id);
  more.classList.remove('active');
}

function deactivateLess(id) {
  const less = getLessById(id);
  less.classList.remove('active');
}

function scrollAnnouncementsIntoView(id) {
  const announcements = getAnnouncementsById(id);
  announcements.scrollIntoView(true);
}

function showMoreAnnouncements(id) {
  const announcements = getAnnouncementsById(id);
  announcements.style.maxHeight = 'none';

  if (moreIsActive(id))
    deactivateMore(id)
  if (!lessIsActive(id))
    activateLess(id)
}

function showLessAnnouncements(id) {
  const announcements = getAnnouncementsById(id);
  announcements.style.maxHeight = '';

  if (lessIsActive(id))
    deactivateLess(id)
  if (!moreIsActive(id))
    activateMore(id)

  scrollAnnouncementsIntoView(id);
}

function postIsValid(post) {
  const { header, details } = post;
  if (isDefined(header) && header !== ''
    && isDefined(details) && details !== '')
    return true;

  return false;
}

function dateObjectIsValid(dateObject) {
  if (isDefined(dateObject) && dateObject != 'Invalid Date')
    return true;

  return false;
}

function getDateString(date) {
  let dateObj = new Date(date);
  if (!dateObjectIsValid(dateObj))
    dateObj = new Date(Date.now());

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = dateObj.toLocaleDateString(undefined, options);
  return dateStr;
}

function postListReducerCallback(list, post) {
  if (postIsValid(post)) {
    const { date, header, details } = post;
    const dateStr = getDateString(date);

    list.push({
      date: dateStr,
      header: header,
      details: details
    });
  }

  return list;
}

function reducePostList(postList) {
  return postList.reduce((list, post) => postListReducerCallback(list, post), []);
}

function sortPostList(postList) {
  let posts = postList;
  posts.forEach(post => post.reverseOrder = Date.parse(post.date));
  posts = sortListByReverseOrder(posts);
  return posts;
}

function buildPostListJsx(id, announcementsTheme, list) {
  if (!isDefined(list) || list.length === 0)
    return;

  let postList = reducePostList(list);
  postList = sortPostList(postList);

  return (
    <ul className={`${announcementsTheme} postList`}>
      {
        postList.map((post, i) => {
          const key = `${id}Post-${i}`;
          const className = i % 2 === 0 ? 'leftPost' : 'rightPost';
          const { date, header, details } = post;

          return (
            <li key={key} className={className} >
              <div className={'postHeader'}>
                <h1>{header}</h1>
                <p>{date}</p>
              </div>
              <div className={'postDetails'}>
                <p>{details}</p>
              </div>
            </li>
          );
        })
      }
      <style jsx>
        {`
          .postList {
            padding-bottom: 55px;
          }
          .white, .blue .leftPost, .blue .rightPost, .white .postDetails {
            background-color: #fff;
            color: #000;
          }
          .blue, .white .leftPost, .white .rightPost, .blue .postDetails {
            background-color: #24316F;
            color: #fff;
          }
          .white .postDetails {
            border-color: #24316F;
          }
          .blue .postDetails {
            border-color: #fff;
          }
          .leftPost, .rightPost {
            position: relative;
            display: inline-block;
            display: inline-table;
            margin: 20px 20px 20px 0;
            border-radius: 10px;
            list-style: none;
          }
          .postHeader {
            margin: 20px 20px 0;
          }
          .postHeader>h1 {
            font-weight: normal;
          }
          .postHeader>p {
            margin-top: 20px;
          }
          .postDetails {
            margin: 0 -20px -20px 20px;
            padding: 20px;
            border-width: 1px;
            border-style: solid;
            border-radius: 10px;
          }
          @media only screen and (min-width: 1000px) {
            .leftPost, .rightPost {
              width: 40%;
              margin: 45px 45px 45px 0;
            }
            .leftPost {
              margin-left: 5%;
            }
            .rightPost {
              margin-left: 55px;
              margin-left: calc(10% - 45px);
              margin-right: 5%;
            }
            .postHeader {
              margin: 45px 45px 0;
            }
            .postHeader>p {
              margin-top: 45px;
            }
            .postDetails {
              margin: 0 -45px -45px 45px;
              padding: 45px;
            }
          }
        `}
      </style>
    </ul>
  );
}

function buildFeedControllerJsx(id, announcementsTheme, icons) {
  return (
    <div>
      <div className={`${announcementsTheme} feedController`}>
        <div className={'blurredArea'}></div>
        <div id={`${id}MorePosts`} className={'morePosts active'}>
          <p className={'controller'} onClick={() => showMoreAnnouncements(id)}>more</p>
          {/* <div className={'chevronDown'} onClick={() => showMoreAnnouncements(id)}>
            <i></i>
          </div> */}
        </div>
        <div id={`${id}LessPosts`} className={'lessPosts'}>
          {/* <div className={'chevronUp'} onClick={() => showLessAnnouncements(id)}>
            <i></i>
          </div> */}
          <p className={'controller'} onClick={() => showLessAnnouncements(id)}>less</p>
        </div>
      </div>
      <style jsx>
        {`
          .feedController {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            height: 80px;
          }
          .blurredArea {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-filter: blur(8px);
            filter: blur(8px);
          }
          .white>.blurredArea {
            background-color: #fff;
          }
          .blue>.blurredArea {
            background-color: #24316F;
          }
          .morePosts, .lessPosts {
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translate(-50%, 0%);
            -moz-transform: translate(-50%, 0%);
            -ms-transform: translate(-50%, 0%);
            -o-transform: translate(-50%, 0%);
            transform: translate(-50%, 0%);
            display: none;
            width: 30%;
            margin: auto;
            text-align: center;
            font-weight: bold;
          }
          .white .morePosts, .white .lessPosts {
            color: #24316F
          }
          .blue .morePosts, .blue .lessPosts {
            color: #fff
          }
          .active {
            display: block;
          }
          .controller {
            transition-duration: .3s;
            font-size: 1.5rem;
          }
          .chevronUp, .chevronDown {
            position: relative;
            display: block;
            height: 35px;
            width: 35px;
            margin: 10px auto 0;
          }
          .white .chevronUp>i, .white .chevronDown>i {
            background-color: #24316F;
            background-image: url(${icons.chevronDown.white});
          }
          .blue .chevronUp>i, .blue .chevronDown>i {
            background-color: #eee;
            background-image: url(${icons.chevronDown.blue});
          }
          .chevronUp>i, .chevronDown>i {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            transition-duration: .3s;
            display: block;
            height: 25px;
            width: 25px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
            cursor: pointer;
          }
          @media not all and (pointer: coarse) {
            .controller:hover, .controller:active {
              cursor: pointer;
              font-size: 2rem;
            }
            .white .chevronUp>i:hover, .white .chevronUp>i:active,
            .white .chevronDown>i:hover, .white .chevronDown>i:active {
              background-color: #24316F;
              background-image: url(${icons.chevronDown.white});
            }
            .blue .chevronUp>i:hover, .blue .chevronUp>i:active,
            .blue .chevronDown>i:hover, .blue .chevronDown>i:active {
              background-color: #fff;
              background-image: url(${icons.chevronDown.blue});
            }
            .chevronUp>i:hover, .chevronUp>i:active,
            .chevronDown>i:hover, .chevronDown>i:active {
              height: 35px;
              width: 35px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default function Announcements({ announcements }) {
  const id = isDefined(announcements.name) ? announcements.name : 'announcements';
  const theme = getTheme(announcements.theme);
  const postListJsx = buildPostListJsx(id, theme, announcements.postList);
  const feedControllerJsx = buildFeedControllerJsx(id, theme, announcements.icons);

  return (
    <div id={`${id}Announcements`} style={{ maxHeight: 650 + 'px', overflow: 'hidden' }}>
      {postListJsx}
      {feedControllerJsx}
    </div>
  );
}
