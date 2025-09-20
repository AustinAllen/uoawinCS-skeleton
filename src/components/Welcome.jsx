import Button from "./Button";

function Welcome() {
  return (
    <section className="bg-[#fcf8d4] py-10">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#fbb02d]">
          Salad Tracker
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Build salads and track your health and wellbeing!
        </p>
        <div className="mt-6">
          <Button className="w-[10px]">Get Started!</Button>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
