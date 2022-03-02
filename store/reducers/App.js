import {
    GET_POSTS,
    GET_CATEGORIES,
    GET_REGIONS,
    GET_SERVICES,
    GET_FEATURED_POSTS,
    GET_CATEGORY_POSTS,
    GET_SIMILAR_POSTS,
    GET_SEARCHED_POSTS,
    GET_FILTERED_POSTS,
} from '../actions/App';

const initialState = {
    posts: [],
    featuredPosts: [],
    similarPosts: [],
    searchedPosts: [],
    categoryPosts: [],
    categories: [],
    regions: [],
    services: [],
    filteredPosts: [],
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
        case GET_SEARCHED_POSTS:
            const fetchedSearchedPosts = [...action.searchedPosts];
            return {
                ...state,
                searchedPosts: fetchedSearchedPosts,
            };
        case GET_FILTERED_POSTS:
            const fetchedFilteredPosts = [...action.filteredPosts];
            return {
                ...state,
                filteredPosts: fetchedFilteredPosts,
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
        case GET_REGIONS:
            const fetchedRegions = [...action.regions];
            return {
                ...state,
                regions: fetchedRegions,
            };
        case GET_SERVICES:
            const fetchedServices = [...action.services];
            return {
                ...state,
                services: fetchedServices,
            };
        default:
            return state;
    }
};
