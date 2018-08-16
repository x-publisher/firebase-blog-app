import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from "react-redux";
import {
  IAppState,
  IAuthState,
  IAppInitState,
  IBlogSettings
} from "./interface";

import PublishedPosts from "./components/views/PublishedPosts";
import RecentPosts from "./components/views/RecentPosts";
import PostView from "./components/views/PostView";
import SigninView from "./components/views/SigninView";
import PostFormPage from "./components/views/PostFormView";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/layout/Loading";

interface AppProps {}
interface ConnectProps {
  authState: IAuthState;
  appInitState: IAppInitState;
  blogSettings: IBlogSettings;
}

class App extends React.Component<AppProps & ConnectProps, {}> {


  componentDidUpdate() {
    if (this.props.blogSettings.loaded && !document.title) {
      document.title = this.props.blogSettings.blog_title
    }
  }

  public render() {
    const { authState, appInitState } = this.props;

    if (
      !appInitState.initialized ||
      authState == null ||
      authState.authenticated == null
    ) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Router>
        <div>
          <Route exact path="/" user={authState} component={PublishedPosts} />
          <Route path="/signin" component={SigninView} />
          <Route path="/post/:slug" component={PostView} />

          <PrivateRoute
            exact
            path="/recent"
            isAdmin={authState.isAdmin}
            component={RecentPosts}
          />
          <PrivateRoute
            path="/new-post"
            isAdmin={authState.isAdmin}
            component={PostFormPage}
          />
          <PrivateRoute
            path="/edit-post/:postId"
            isAdmin={authState.isAdmin}
            component={PostFormPage}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: IAppState): ConnectProps => {
  return {
    authState: state.authState,
    appInitState: state.appInitState,
    blogSettings: state.blogSettingsState
  };
}

const _App = connect(mapStateToProps)(App);

export default _App;
