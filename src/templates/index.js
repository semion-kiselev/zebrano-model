import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import AboutUs from '../components/about-us';
import SectionLinks from '../components/section-links';
import trans from '../lang';
import {pageLinks} from '../constants';

class Home extends PureComponent {
  render() {
    const {locale, itemsForNews} = this.props.pageContext;

    return (
      <Layout
        locale={locale}
        title={trans.HOME_HEAD_TITLE[locale]}
        description={trans.HOME_HEAD_DESCRIPTION[locale]}
        pageName={pageLinks.home}
        newsItems={itemsForNews}
      >
        <div className="index-content">
          <div className="index-content__about-us">
            <AboutUs locale={locale}/>
          </div>
          <div className="index-content__section-links">
            <SectionLinks locale={locale}/>
          </div>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  pageContext: PropTypes.object.isRequired,
};

export default Home;
