import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content border-t border-base-300 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-center sm:text-left lg:justify-items-center">

                    <div className="space-y-4 flex flex-col items-center sm:items-start">
                        <div className="flex items-center justify-center gap-2">
                            <Image src={logo} alt="Logo" width={30} height={30} className="inline-block" />
                            <h2 className="text-2xl font-black tracking-tight leading-none">
                                <span className="text-base-content">Doc</span>
                                <span className="text-error">Appoint</span>
                            </h2>
                        </div>
                        <p className="text-sm text-base-content/70 leading-relaxed max-w-sm">
                            Your health, our priority. Book instantly.
                        </p>
                        <div className="pt-2">
                            <div className="w-40 h-0.5 bg-primary/40 rounded-full"></div>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col items-center sm:items-start">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-primary">
                            Follow Us
                        </h3>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/70 hover:text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-md"
                                aria-label="GitHub"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/70 hover:text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-md"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={18} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/70 hover:text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-md"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col items-center sm:items-start">
                        <h3 className="text-sm font-semibold tracking-widest uppercase text-primary">
                            Contact Us
                        </h3>
                        <div className="space-y-3">
                            <p className="flex items-center gap-3 text-sm text-base-content/70 justify-center sm:justify-start group">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <FaEnvelope className="text-primary text-sm" />
                                </span>
                                <span>support@docappoint.com</span>
                            </p>
                            <p className="flex items-center gap-3 text-sm text-base-content/70 justify-center sm:justify-start group">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <FaPhone className="text-primary text-sm" />
                                </span>
                                <span>+880 1628110902</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-base-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-base-300 px-4 text-xs text-base-content/40">● ● ●</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-around items-center gap-4 text-center">
                    <p className="text-xs text-base-content/50">
                        © {new Date().getFullYear()} DocAppoint. All rights reserved.
                    </p>

                    <div className="flex gap-1 items-center">
                        <span className="text-xs text-base-content/40">©</span>
                        <span className="text-xs font-medium text-base-content/60">{new Date().getFullYear()}</span>
                        <span className="text-xs text-base-content/40">Created by</span>
                        <span className="text-xs font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">IMT</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;