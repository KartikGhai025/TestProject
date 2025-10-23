"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const animals = [
  {
    id: 1,
    name: "Milo 🐕",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Playful, loyal, and always ready for a walk in the park.",
    image: "/images/milo.jpg",
  },
  {
    id: 2,
    name: "Luna 🐾",
    breed: "Siberian Husky",
    age: "1.5 years",
    description: "Smart, gentle, and loves attention. Great with kids!",
    image: "/images/luna.jpg",
  },
  {
    id: 3,
    name: "Oreo 🐈",
    breed: "Persian Cat",
    age: "3 years",
    description: "A calm, loving cat who enjoys cozy naps by the window.",
    image: "/images/oreo.jpg",
  },
  {
    id: 4,
    name: "Max 🐶",
    breed: "Beagle",
    age: "2.5 years",
    description: "Curious, friendly, and full of energy. Loves exploring!",
    image: "/images/max.jpg",
  },
];

export default function AdoptUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-orange-100">
      {/* 🐾 Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Adopt. Love. Repeat. 🧡
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Every tail tells a story. Give our furry friends a forever home filled with love and care.
        </motion.p>
        <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 text-lg">
          View Adoption Form
        </Button>
      </section>

      {/* 🐶 Animal Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Meet Our Adorable Friends 🐾
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {animals.map((animal) => (
            <motion.div
              key={animal.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={animal.image}
                alt={animal.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-gray-800">{animal.name}</h3>
                <p className="text-sm text-gray-500">
                  {animal.breed} • {animal.age}
                </p>
                <p className="text-gray-600 mt-2">{animal.description}</p>
                <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                  Adopt {animal.name.split(" ")[0]}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🦴 How Adoption Works */}
      <section className="bg-orange-100 py-14 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          How Adoption Works 🦴
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: "1", text: "Choose your furry friend" },
            { step: "2", text: "Fill the adoption form" },
            { step: "3", text: "Meet & bring them home 🏡" },
          ].map((item) => (
            <motion.div
              key={item.step}
              className="bg-white rounded-2xl p-6 shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {item.step}
              </div>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🐾 CTA Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Ready to Change a Life?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Adopting an animal is an act of kindness that gives love, warmth, and hope to a soul waiting for you.
        </p>
        <Button className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-3 text-lg">
          Start Adoption
        </Button>
      </section>
    </div>
  );
}
