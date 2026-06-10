"use client"
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
const images = [
    {
        src: "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Majestic mountain ranges surrounding Kohat"
    },
    {
        src: "https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Historic fort architecture reminiscent of Kohat Fort"
    },
    {
        src: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Scenic valley landscape near Kohat"
    },
    {
        src: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Traditional bazaar streets of Kohat"
    },
    {
        src: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Tanda Dam and surrounding hills"
    },
    {
        src: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Sunset over Kohat's rugged terrain"
    },
    {
        src: "https://images.pexels.com/photos/1010648/pexels-photo-1010648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Lush green landscapes of Kohat region"
    },
    {
        src: "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Ancient pathways and heritage sites"
    },
    {
        src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Rocky cliffs and natural beauty of KPK"
    },
    {
        src: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Traditional Pashtun culture and craftsmanship"
    },
    {
        src: "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Misty mountain mornings near Kohat"
    },
    {
        src: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Dawn breaking over Kohat's peaks"
    },
    {
        src: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Colorful traditional trucks on Kohat's highways"
    },
    {
        src: "https://images.pexels.com/photos/1581553/pexels-photo-1581553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Local farmers working in Kohat's fertile lands"
    },
    {
        src: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Beautiful mosque architecture in Kohat"
    },
 
  
];

const KineticGridItem = ({ image, scrollVelocity }: {
    image: { src: string; alt: string };
    scrollVelocity: any;
}) => {
    const smoothedVelocity :any = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    const skew = useTransform(smoothedVelocity , [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg group"
            style={{ skewX: skew as any }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{
                    transform: "scale(1.15)"
                }}
            />
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Caption on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-medium drop-shadow-lg">
                    {image.alt}
                </p>
            </div>
        </motion.div>
    );
};

export default function KineticScrollGallery() {
    const { scrollYProgress } = useScroll();

    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000],
        { clamp: false } as any
    );

    return (
        <div className=" bg-gradient-to-r from-primary/5 to-primary/5 min-h-screen py-20">
            <div className="mx-auto  container p-4 sm:p-6 lg:p-8">
                <div className="mb-12 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Discover Kohat
                    </span>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-foreground">
                        The Beauty of <span className="text-primary">Kohat</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        From ancient forts to breathtaking valleys — scroll to feel the rhythm of the heart of KPK.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {images.map((img, index) => (
                        <KineticGridItem
                            key={index}
                            image={img}
                            scrollVelocity={scrollYVelocity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}