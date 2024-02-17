type DashboardLayoutProps = {
    children: React.ReactNode,
};
const Layout = ({ children }: DashboardLayoutProps) => {

    return(
        <>
            <nav className="flex flex-wrap bg-black text-white py-5 sticky-top">
                <i className="bi bi-menu-app pl-2"></i>
                <span className="pl-4">Dashboard</span>
            </nav>
            <main className="bg-white">{children}</main>
        </>
    )

}

export default Layout