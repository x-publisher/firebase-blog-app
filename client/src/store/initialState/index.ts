import {
  IAuthState,
  IBlogSettings,
  IUsersState,
  IPostData,
  IPostsState,
  IPostViewState,
  IPostFormState,
  IPostFormValues
} from '../../interface';

export const initail_BlogSetting: IBlogSettings =  {
  blog_title: '',
  blog_description: '',
  blog_background_cover_url: '',
  loaded: false
}

export const initial_AuthState: IAuthState = {
  authenticated: false,
  authUser: {
    uid: '',
    email: '',
    displayName: ''
  }
};

export const initial_PostsState: IPostsState = {
  posts: []
};

export const initial_UsersState: IUsersState = {
  users: []
};

export const initial_PostDataState: IPostData = {
  userId: '',
  title: '',
  body: '',
  excerpt: '',
  pinned: false,
  status: 'draft',
  publish_date: 0,
  slug: '',
  created_date: 0
};

export const initial_PostViewState: IPostViewState = {
  loadingStatus: 'init',
  slugOrID: '',
  error: '',
  post: undefined
};

export const initial_PostFormValuesState: IPostFormValues = {
  ...initial_PostDataState,
  postId: '',
  publish_date_string: '',
  userId: '',
  photoUrl: ''
};

export const initial_PostFormState: IPostFormState = {
  loadingStatus: 'init',
  submitStatus: '',
  postId: '',
  formValues: initial_PostFormValuesState,
  error: ''
};

