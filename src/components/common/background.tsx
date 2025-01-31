const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-50">
            <div
                className="absolute inset-0 z-10"
                style={{
                    backgroundImage: "url('/assets/background.svg')",
                    backgroundSize: "180px 180px",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                }}
            />
        </div>
    );
};

export default Background;
