import axios from '../../axios-instance';

export const GET_POSTS = 'GET_POSTS';

export const getPosts = () => {
    return dispatch => {
        axios
            .get(`/posts?populate=*`)
            .then(response => {
                // console.log(response.data.data[1].attributes.thumbnail.data.attributes);
                const fetchedPosts = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedPosts.push({
                        id: key,
                        title: queryPrefix.title,
                        content: queryPrefix.content,
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
