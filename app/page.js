"use client"; // Mark this file as a client component

import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { useEffect, useState } from "react";

async function getData() {
  if (typeof window === "undefined") {
    return []; // Prevent fetching during SSR
  }

  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const blogsData = await getData();
      setBlogs(blogsData);
    }

    fetchBlogs();
  }, []);

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {/* <Blog blogs={blogs} /> */}
      <ContactSection />
    </div>
  );
}
