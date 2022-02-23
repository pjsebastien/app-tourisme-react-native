import axios from '../../axios-instance';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_FEATURED_POSTS = 'GET_FEATURED_POSTS';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';

export const getPosts = () => {
    return dispatch => {
        axios
            .get(`/posts?populate=*`)
            .then(response => {
                console.log(
                    response.data.data[1].attributes.services.data.map(
                        tag => tag.attributes.name,
                    ),
                );
                const fetchedPosts = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({ type: GET_POSTS, posts: fetchedPosts });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getFeaturedPosts = () => {
    return dispatch => {
        axios
            .get(`/posts?filters[isFeatured][$eq]=true&populate=*`)
            .then(response => {
                // console.log(response.data.data[1].id);
                const fetchedFeaturedPosts = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedFeaturedPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({
                    type: GET_FEATURED_POSTS,
                    featuredPosts: fetchedFeaturedPosts,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getCategoryPosts = category => {
    return dispatch => {
        axios
            .get(`/posts?populate=*&[filters][category][name][$eq]=${category}`)
            .then(response => {
                // console.log(response.data.data[1].id);
                const fetchedCategoryPosts = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedCategoryPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({
                    type: GET_CATEGORY_POSTS,
                    categoryPosts: fetchedCategoryPosts,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getCategories = () => {
    return dispatch => {
        axios
            .get(`/categories?populate=thumbnail`)
            .then(response => {
                const fetchedCategories = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedCategories.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                        image: queryPrefix.thumbnail.data,
                    });
                }
                dispatch({ type: GET_CATEGORIES, categories: fetchedCategories });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
