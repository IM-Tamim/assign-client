import Image from "next/image";
import { FiMapPin, FiClock, FiStar, FiUser } from "react-icons/fi";
import { MdOutlineLocalHospital } from "react-icons/md";

const DoctorCard = ({ doctor, onViewDetails }) => {
    return (
        <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

            <div className="relative h-52 overflow-hidden bg-base-200">
                <Image
                    src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random&size=200`}
                    alt={doctor.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        const img = e.target;
                        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=4f8ef7&color=fff&size=200`;
                    }}
                />
                {/* Specialty badge */}
                <span className="absolute top-3 left-3 bg-error text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {doctor.specialty}
                </span>
                {/* Rating badge */}
                <span className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm text-base-content text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <FiStar size={11} className="text-warning fill-warning" />
                    {doctor.rating}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-3">

                {/* Name & experience */}
                <div>
                    <h3 className="font-bold text-base text-base-content leading-tight">
                        {doctor.name}
                    </h3>
                    <p className="text-xs text-base-content/50 mt-0.5 flex items-center gap-1">
                        <FiUser size={11} />
                        {doctor.experience} experience · {doctor.totalReviews} reviews
                    </p>
                </div>

                {/* Hospital */}
                <p className="text-xs text-base-content/60 flex items-start gap-1.5">
                    <MdOutlineLocalHospital size={13} className="mt-0.5 shrink-0 text-error" />
                    {doctor.hospital}
                </p>

                {/* Location */}
                <p className="text-xs text-base-content/60 flex items-center gap-1.5">
                    <FiMapPin size={11} className="shrink-0 text-error" />
                    {doctor.location}
                </p>

                {/* Availability */}
                <div className="flex flex-col gap-1">
                    {doctor.availability?.slice(0, 2).map((slot, i) => (
                        <span
                            key={i}
                            className="text-xs text-base-content/60 flex items-center gap-1.5"
                        >
                            <FiClock size={11} className="shrink-0 text-error" />
                            {slot}
                        </span>
                    ))}
                </div>

                {/* Divider + fee + button */}
                <div className="flex items-center justify-between pt-2 border-t border-base-300 mt-auto">
                    <span className="text-sm font-bold text-error">
                        ৳ {doctor.fee}
                        <span className="text-xs font-normal text-base-content/40"> /visit</span>
                    </span>
                    <button
                        onClick={() => onViewDetails(doctor._id)}
                        className="btn btn-sm btn-error btn-outline rounded-lg text-xs font-semibold"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;