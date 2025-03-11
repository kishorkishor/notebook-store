import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Modern Notebook Store",
  description: "Learn about our story, values, and commitment to quality notebooks.",
}

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Story</h1>
        
        <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
          <Image 
            src="/pics/kelly-sikkema-dgVSuJu58C0-unsplash.jpg"
            alt="Person writing in notebook"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Founded in 2020 by Kishor Tarafder in Dhaka, Bangladesh, Notebook Store began with a simple mission: to create high-quality notebooks that inspire creativity and productivity. What started as a small passion project has grown into a dedicated team committed to crafting exceptional writing tools.
          </p>
          
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/pics/eugene-chystiakov-wcMysLw5ROM-unsplash.jpg"
                alt="Creative notebook layout"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/pics/aaron-burden-xG8IQMqMITM-unsplash.jpg"
                alt="Notebook and workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        
          <h2>Our Philosophy</h2>
          <p>
            We believe that the right notebook can transform the way you think, create, and organize your life. Whether you're an artist, professional, student, or journaling enthusiast, we design products that adapt to your unique needs and enhance your daily experience.
          </p>
          
          <p>
            Every notebook we create embodies our core values:
          </p>
          
          <ul>
            <li>
              <strong>Quality:</strong> We select premium materials that stand the test of time and provide an exceptional writing experience.
            </li>
            <li>
              <strong>Functionality:</strong> Our designs prioritize usability with thoughtful features that make organizing your thoughts effortless.
            </li>
            <li>
              <strong>Sustainability:</strong> We're committed to environmentally conscious manufacturing practices and materials.
            </li>
            <li>
              <strong>Accessibility:</strong> We believe great tools should be available to everyone at fair prices.
            </li>
          </ul>
          
          <h2>Meet Our Founder</h2>
          
          <div className="my-6 flex items-center gap-6">
            <div className="w-32 h-32 relative rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="/pics/beechmore-books-ZGMmMDu6P6s-unsplash.jpg"
                alt="Kishor Tarafder, Founder"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mt-0">
                Kishor Tarafder, a lifelong stationery enthusiast, started Notebook Store after noticing a gap in the market for high-quality, locally-made notebooks in Bangladesh. With a background in design and a passion for craftsmanship, Kishor has created a brand that blends traditional Bangladeshi artisanal techniques with modern design aesthetics.
              </p>
            </div>
          </div>
        
          <h2>Our Process</h2>
          <p>
            Each notebook design undergoes rigorous testing and refinement. We collaborate with local artisans, writers, artists, and productivity experts to ensure our products meet real-world needs. From paper weight and texture to binding durability, every detail matters.
          </p>
          
          <div className="my-8 aspect-video relative rounded-lg overflow-hidden">
            <Image 
              src="/pics/gabrielle-henderson-M4lve6jR26E-unsplash.jpg"
              alt="Notebook crafting process"
              fill
              className="object-cover"
            />
          </div>
        
          <p>
            We source materials responsibly within Bangladesh when possible, partner with ethical manufacturers, and continuously look for ways to reduce our environmental footprint while delivering products that exceed your expectations.
          </p>
          
          <h2>Join Our Journey</h2>
          <p>
            As we continue to grow, we remain dedicated to our community of notebook enthusiasts. Your feedback shapes our future designs and helps us create better products for everyone in Bangladesh and beyond.
          </p>
          
          <p>
            Thank you for supporting our vision of creating thoughtfully designed notebooks that inspire your best work.
          </p>

          <h2>Contact Information</h2>
          <p>
            We'd love to hear from you! For questions, suggestions, or partnership inquiries, please reach out to:
          </p>
          <ul>
            <li>Email: kishortarafder@gmail.com</li>
            <li>Phone: 01742992646</li>
            <li>Address: 123 Gulshan Avenue, Dhaka 1212, Bangladesh</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
