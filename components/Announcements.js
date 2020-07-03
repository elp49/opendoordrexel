import styles from './Announcements.module.css'

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function sortListByReverseOrder(list) {
  return list.sort((a, b) => b.reverseOrder - a.reverseOrder);
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
  // TODO: check if this works.
  posts.forEach(post => post.order = Date.parse(post.date));
  // posts.forEach(post => {
  //   post.order = Date.parse(post.date);
  // });

  posts = sortListByReverseOrder(posts);
  return posts;
}

function buildPostListJsx(id, list) {
  if (!isDefined(list) || list.length === 0)
    return;

  let postList = reducePostList(list);
  postList = sortPostList(postList);

  return (
    postList.map((post, i) => {
      const key = `${id}Post-${i}`;
      const className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
      const { date, header, details } = post;

      return (
        <li key={key} className={className} >
          <div className={styles.postHeader}>
            <h1>{header}</h1>
            <p>{date}</p>
          </div>
          <div className={styles.postDetails}>
            <p>{details}</p>
          </div>
        </li>
      );
    })
  );
}

export default function Announcements({ announcements }) {
  const id = isDefined(announcements.name) ? announcements.name : 'announcements';
  const postListJsx = buildPostListJsx(id, announcements.postList);

  return (
    <ul id={`${id}Announcements`} className={styles.announcements}>
      {postListJsx}
    </ul>
  );
}
