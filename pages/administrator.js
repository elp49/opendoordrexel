import Layout, { isDefined, sortListByOrder } from '../components/Layout'
import Section from '../components/Section'

const PAGE_NAME = "admin";

const admin = {
  "name": "admin",
  "sections": {
    "intro": {
      "order": 1,
      "theme": "white",
      "sectionDetails": {
        "name": "intro",
        "theme": "white",
        "titles": [
          "Administrator Page"
        ],
        "subtitles": [],
        "descriptions": [
          "Enter username and password to grant administrator privilege."
        ]
      }
    }
  }
};

function buildIntroSection(intro) {
  if (!isDefined(intro))
    return;

  const { order, sectionDetails } = intro;
  const introJsx = (
    <Section sectionDetails={sectionDetails}>
      <div className={'loginContainer'}>
        <form action={() => login()} method={'post'}>
          <div className={'loginInfo'}>
            <div className={'username'}>
              <label for={'username'}><h3>Username</h3></label>
              <input type={'text'} placeholder={'Enter Username'} name={'username'} required={true} />
            </div>
            <div className={'password'}>
              <label for={'password'}><h3>Password</h3></label>
              <input type={'password'} placeholder={'Enter Password'} name={'password'} required={true} />
            </div>
            <button type={'submit'} className={'login'}><h3>Login</h3></button>
            <div className={'forgotPassword'}>
              <button type={'button'} className={'cancelBtn'}>Cancel</button>
              <span>Forgot <a href={'#'}>password?</a></span>
            </div>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .loginContainer {
            width: 80%;
            margin: auto;
            padding: 45px;
            text-align: left;
          }
          .loginInfo {
            width: 100%;
            max-width: 500px;
            margin: auto;
          }
          .loginInfo label, .loginInfo input {
            display: inline;
            width: 100%;
          }
          .username {
            margin-top: 20px;
          }
          .password {
            margin-top: 20px;
          }
          .login {
            margin-top: 20px;
          }
          .forgotPassword {
            margin-top: 20px;
            text-align: center;
          }
          .forgotPassword>* {
            display: inline-block;
            width: 51%;
            margin: 20 auto 0;
          }
          .cancelBtn {
          }
        `}
      </style>
    </Section>
  );

  return {
    order: order,
    name: sectionDetails.name,
    jsx: introJsx
  };
}

function buildSections(pageSections) {
  const introSection = buildIntroSection(pageSections.intro);

  return {
    intro: introSection
  };
}

function buildSectionList(pageSections) {
  if (!isDefined(pageSections))
    return;

  const sections = buildSections(pageSections);
  let sectionList = [];
  for (const s in sections)
    if (isDefined(sections[s]))
      sectionList.push({ order: sections[s].order, jsx: sections[s].jsx });

  sectionList = sortListByOrder(sectionList);

  return sectionList;
}

export default function Admin() {
  const sectionList = buildSectionList(admin.sections);

  return (
    <Layout pageDetails={admin.pageDetails}>
      {
        sectionList.map(section => {
          const key = `${PAGE_NAME}Section-${section.order}`;

          return (
            <div key={key} id={key}>
              {section.jsx}
            </div>
          );
        })
      }
    </Layout>
  );
}
