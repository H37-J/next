export default function Blog({ posts }: any) {

   return <img src={posts.file}/>
}

export async function getStaticProps() {
    const res = await fetch('https://coffee.alexflipnote.dev/random.json')
    const posts = await res.json()
    console.log(posts)
    return {
        props: {
            posts,
        },
    }
}