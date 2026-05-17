import HeroBanner from "@/components/pages/homepage/HeroBanner";
import PatientTestimonials from "@/components/pages/homepage/PatientTestimonials";
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
            <PatientTestimonials/>
        </div>
    );
};

export default HomePage;