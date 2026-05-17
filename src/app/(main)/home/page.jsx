import HeroBanner from "@/components/pages/homepage/HeroBanner";
import TopRatedDoctors from "@/components/pages/homepage/TopRatedDoctors";
import WhyChooseUs from "@/components/pages/homepage/WhyChooseUs";


export const metadata = {
    title: "Home | DocAppoint",
    description: "Book doctor appointments instantly with DocAppoint.",
};

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <TopRatedDoctors/>
            <WhyChooseUs/>
        </div>
    );
};

export default HomePage;