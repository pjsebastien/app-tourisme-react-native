//Pour maper les tags dans les posts

{
    posts[0].services.map((tag, index) => (
        <Text style={{ color: 'white' }} key={tag + index}>
            {tag.attributes.name}
        </Text>
    ));
}
