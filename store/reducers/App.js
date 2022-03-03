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
    GET_ABOUT,
    GET_ADDPOST,
    GET_BIVOUAC,
    GET_CAMPING,
    GET_PRIVACY,
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
    about: [],
    addPost: [],
    bivouac: [],
    camping: [],
    privacy: [],
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
        case GET_ABOUT:
            const fetchedAbout = action.about;
            return {
                ...state,
                about: fetchedAbout,
            };
        case GET_ADDPOST:
            const fetchedAddPost = action.addPost;
            return {
                ...state,
                addPost: fetchedAddPost,
            };
        case GET_BIVOUAC:
            const fetchedBivouac = action.bivouac;
            return {
                ...state,
                bivouac: fetchedBivouac,
            };
        case GET_CAMPING:
            const fetchedCamping = action.camping;
            return {
                ...state,
                camping: fetchedCamping,
            };
        case GET_PRIVACY:
            const fetchedPrivacy = action.privacy;
            return {
                ...state,
                privacy: fetchedPrivacy,
            };
        default:
            return state;
    }
};
