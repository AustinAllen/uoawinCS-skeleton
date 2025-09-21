import Card from "../components/Card";
import ContactForm from "../components/ContactForm";

function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">About Carrot</h1>
      <p>Carrot Salad Tracker is a web application designed to help users build and track their salads for better health and wellbeing. 
        Whether you're looking to manage your weight, increase your protein intake, or simply eat more vegetables, Carrot has you covered! 
        Our platform offers a variety of salad options, nutritional information, and tracking features to help you stay on top of your health goals. 
        Join us on our mission to make healthy eating easy and enjoyable for everyone! 
      </p>
      {/* <div className="mt-[50px]">
        <Card
          title="ABOUT ME INFO"
          description="Lorem ipsum is a dummy or placeholder text commonly used in graphic design."
          image="https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div> */}
      <ContactForm />
    </div>
  );
}

export default About;