import HeroBanner from "@/components/pages/homepage/HeroBanner";
import TopRatedDoctors from "@/components/pages/homepage/TopRatedDoctors";


export const metadata = {
    title: "Home | DocAppoint",
    description: "Book doctor appointments instantly with DocAppoint.",
};

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <TopRatedDoctors/>
        </div>
    );
};

export default HomePage;