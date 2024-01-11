export const Posts = ({ posts }: any) => {
   return <img src={posts.file}/>
}

export async function getStaticProps() {
    const res = await fetch('https://coffee.alexflipnote.dev/random.json')
    const posts = await res.json()
    return {
        props: {
            posts,
        },
    }
}