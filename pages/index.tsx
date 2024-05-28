import Header from "./templates/header";
import Sidebar from "./templates/sidebar";
import Container from "./templates/contents/container";


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