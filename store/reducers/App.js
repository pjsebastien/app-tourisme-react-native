import {
    GET_POSTS,
    GET_CATEGORIES,
    GET_FEATURED_POSTS,
    GET_CATEGORY_POSTS,
    GET_SIMILAR_POSTS,
} from '../actions/App';

const initialState = {
    posts: [],
    featuredPosts: [],
    similarPosts: [],
    categoryPosts: [],
    categories: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            const fetchedPosts = [...action.posts];
            return {
                ...state,
                posts: fetchedPosts,
            };
        case GET_FEATURED_POSTS:
            const fetchedFeaturedPosts = [...action.featuredPosts];
            return {
                ...state,
                featuredPosts: fetchedFeaturedPosts,
            };
        case GET_SIMILAR_POSTS:
            const fetchedSimilarPosts = [...action.similarPosts];
            return {
                ...state,
                similarPosts: fetchedSimilarPosts,
            };
        case GET_CATEGORY_POSTS:
            const fetchedCategoryPosts = [...action.categoryPosts];
            return {
                ...state,
                categoryPosts: fetchedCategoryPosts,
            };
        case GET_CATEGORIES:
            const fetchedCategories = [...action.categories];
            return {
                ...state,
                categories: fetchedCategories,
            };
        default:
            return state;
    }
};
