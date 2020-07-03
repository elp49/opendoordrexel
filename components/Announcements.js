import styles from './Announcements.module.css'

function isDefined(a) {
  if (typeof a !== 'undefined')
    return true;

  return false;
}

function sortListByOrder(list) {
  return list.sort((a, b) => a.order - b.order);
}

function sortPostList(postList) {
  let posts = postList;
  posts.forEach(post => {
    const { month, year } = post;
    post.order = Date.parse(`01 ${month} ${year}`);
  });

  return sortListByOrder(posts);
}

function buildPostList(list) {
  // if (!isDefined(list) || list.length === 0)
  //   return [];

  // let postList = reduceSlideList(list);
  // postList = sortPostList(postList);

  // return postList;
  return list
}

export default function Announcements({ announcements }) {
  const id = isDefined(announcements.name) ? announcements.name : 'announcements';
  const postList = buildPostList(announcements.postList);

  return (
    <ul id={`${id}Announcements`} className={styles.announcements}>
      {
        postList.map((post, i) => {
          const key = `${announcements.name}Post-${i}`;
          const className = i % 2 === 0 ? styles.leftPost : styles.rightPost;
          const { date, header, details } = post;
          let dateStr = new Date(date).toLocaleDateString();
          if (dateStr === 'Invalid Date' || dateStr === '1970-01-01T00:00:00.000Z') dateStr = '';

          return (
            <li key={key} className={className} >
              <div className={styles.postHeader}>
                <h1>{header}</h1>
                <p>{dateStr}</p>
              </div>
              <div className={styles.postDetails}>
                <p>{details}</p>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}
