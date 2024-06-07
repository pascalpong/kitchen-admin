
const Item = ({ params }: { params: { slug: string } }) => {
    return (
        <>
            { params.slug }
        </>
    )
}

export default Item