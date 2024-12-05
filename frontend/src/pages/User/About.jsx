import Title from "../../components/User/Title";
import { assets } from "../../assets/assets";
import NewsLetterBox from "../../components/User/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever Clothing is a brand that embodies timeless fashion and
            uncompromising quality. We pride ourselves on crafting apparel that
            resonates with individuality, blending classic designs with modern
            trends to create pieces that last a lifetime. Our collections are
            designed to inspire confidence and celebrate personal style.
          </p>
          <p>
            At the heart of Forever Clothing is a commitment to sustainability
            and ethical practices. We carefully source our materials and work
            with partners who share our values, ensuring that every garment is
            as kind to the planet as it is to you. Our goal is to redefine
            fashion with purpose, one outfit at a time.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to empower individuals to express themselves through
            clothing that combines elegance, comfort, and durability. We aim to
            make fashion accessible to everyone, while fostering a deeper
            connection between our customers and the values of sustainability,
            inclusivity, and authenticity.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance :</b>
          <p>
            We ensure top-notch quality in every aspect of our services,
            adhering to the highest standards. Our commitment to excellence
            guarantees reliability, precision, and client satisfaction.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p>
            Our solutions are designed with your convenience in mind, offering
            seamless processes and user-friendly experiences to save you time
            and effort.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p>
            We pride ourselves on delivering exceptional customer support,
            addressing your concerns promptly and ensuring a positive,
            personalized experience every time.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
