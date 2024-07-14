interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <section className="mx-auto max-w-screen-sm">{children}</section>;
};

export default Layout;
