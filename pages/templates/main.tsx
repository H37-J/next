import Header from "./header";
import Sidebar from "./sidebar";
import Container from "./contents/container";


const Page = () => {
    return (
        <>
            <Header></Header>
            <Sidebar></Sidebar>
            <Container></Container>
        </>
    )
}

export default Page