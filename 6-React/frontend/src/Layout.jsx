import Header from "@pages/Header"
import Footer from "@Components/Footer"
import {Outlet} from "react-router-dom"

const Layout = () => {
    return(
        <>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </>
    )
}

export default Layout;