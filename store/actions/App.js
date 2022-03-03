import axios from '../../axios-instance';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_REGIONS = 'GET_REGIONS';
export const GET_SERVICES = 'GET_SERVICES';
export const GET_FEATURED_POSTS = 'GET_FEATURED_POSTS';
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';
export const GET_SIMILAR_POSTS = 'GET_SIMILAR_POSTS';
export const GET_SEARCHED_POSTS = 'GET_SEARCHED_POSTS';
export const GET_FILTERED_POSTS = 'GET_FILTERED_POSTS';
export const GET_ABOUT = 'GET_ABOUT';
export const GET_ADDPOST = 'GET_ADDPOST';
export const GET_BIVOUAC = 'GET_BIVOUAC';
export const GET_CAMPING = 'GET_CAMPING';
export const GET_PRIVACY = 'GET_PRIVACY';

export const getPosts = () => {
    return dispatch => {
        axios
            .get(`/posts?populate=*&sort=createdAt%3Adesc`)
            .then(response => {
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
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
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
            .get(`/posts?filters[isFeatured][$eq]=true&populate=*&sort=createdAt%3Adesc`)
            .then(response => {
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
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
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
export const getSimilarPosts = (category, region) => {
    return dispatch => {
        axios
            .get(
                `/posts?populate=*&[filters][category][name][$eq]=${category}&[filters][region][name][$eq]=${region}&pagination[start]=0&pagination[limit]=6`,
            )
            .then(response => {
                const fetchedSimilarPosts = [];

                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedSimilarPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({
                    type: GET_SIMILAR_POSTS,
                    similarPosts: fetchedSimilarPosts,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getSearchedPosts = query => {
    return dispatch => {
        axios
            .get(`/posts?populate=*&[filters][title][$containsi]=${query}`)
            .then(response => {
                const fetchedSearchedPosts = [];

                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedSearchedPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({
                    type: GET_SEARCHED_POSTS,
                    searchedPosts: fetchedSearchedPosts,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getFilteredPosts = query => {
    return dispatch => {
        axios
            .get(`/posts?populate=*&${query}`)
            .then(response => {
                const fetchedFilteredPosts = [];

                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedFilteredPosts.push({
                        id: response.data.data[key].id,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
                        itinerary: queryPrefix.itinerary,
                        link: queryPrefix.link,
                        price: queryPrefix.price,
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
                        category: queryPrefix.category.data.attributes.name,
                        region: queryPrefix.region.data.attributes.name,
                    });
                }
                dispatch({
                    type: GET_FILTERED_POSTS,
                    filteredPosts: fetchedFilteredPosts,
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
            .get(
                `/posts?populate=*&[filters][category][name][$eq]=${category}&sort=createdAt%3Adesc`,
            )
            .then(response => {
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
                        phone: queryPrefix.phone,
                        adress: queryPrefix.adress,
                        author: queryPrefix.author,
                        lat: queryPrefix.lat,
                        lon: queryPrefix.lon,
                        services: queryPrefix.services.data,
                        image: queryPrefix.thumbnail.data,
                        postImage: queryPrefix.thumbnail.data.attributes.url,
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
export const getRegions = () => {
    return dispatch => {
        axios
            .get(`/regions/`)
            .then(response => {
                const fetchedRegions = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedRegions.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                    });
                }
                dispatch({ type: GET_REGIONS, regions: fetchedRegions });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getServices = () => {
    return dispatch => {
        axios
            .get(`/services/`)
            .then(response => {
                const fetchedServices = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedServices.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                    });
                }
                dispatch({ type: GET_SERVICES, services: fetchedServices });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getAbout = () => {
    return dispatch => {
        axios
            .get(`/about/`)
            .then(response => {
                let fetchedAbout = {
                    content: response.data.data.attributes.content,
                };

                dispatch({ type: GET_ABOUT, about: fetchedAbout });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getAddPost = () => {
    return dispatch => {
        axios
            .get(`/addpost`)
            .then(response => {
                let fetchedAddPost = {
                    content: response.data.data.attributes.content,
                };

                dispatch({ type: GET_ADDPOST, addPost: fetchedAddPost });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getBivouac = () => {
    return dispatch => {
        axios
            .get(`/bivouac`)
            .then(response => {
                let fetchedBivouac = {
                    content: response.data.data.attributes.content,
                };

                dispatch({ type: GET_BIVOUAC, bivouac: fetchedBivouac });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getCamping = () => {
    return dispatch => {
        axios
            .get(`/camping`)
            .then(response => {
                let fetchedCamping = {
                    content: response.data.data.attributes.content,
                };

                dispatch({ type: GET_CAMPING, camping: fetchedCamping });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getPrivacy = () => {
    return dispatch => {
        axios
            .get(`/privacy`)
            .then(response => {
                let fetchedPrivacy = {
                    content: response.data.data.attributes.content,
                };

                dispatch({ type: GET_PRIVACY, privacy: fetchedPrivacy });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
