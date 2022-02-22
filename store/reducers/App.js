import { GET_POSTS } from '../actions/App';

const initialState = {
    posts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            const fetchedPosts = [...action.posts];
            return {
                ...state,
                posts: fetchedPosts,
            };
        default:
            return state;
    }
};
