import React from "react";

const Features = () => {
  const data = [
    {
      id: 1,
      image: "images/global.png",
      heading: "Global Citizenship",
      desc: "We inspire the practice of good deeds in everyday life and spark a global revolution of kindness, justice, and integrity. Thus, putting the concept of 'global citizenship' into action.",
    },
    {
      id: 2,
      image: "images/one-race.png",
      heading: "One Race, One Nation",
      desc: "Virtues are the very meaning and purpose of our lives, the content of our character, and the most genuine expression of our souls. 'VIRTU' is for people of all cultures, ethnicities, and beliefs as the only goal we seek is a better and more sustainable future for all.",
    },
    {
      id: 3,
      image: "images/speek.png",
      heading: "Speak the Language of Virtues",
      desc: "Let's pledge to make this world a better place for humankind. Let's promise to become the most virtuous version of ourselves and support good causes regularly.",
    },
  ];
  return (
    <section className="virtu-features" id="features">
      <div className="container">
        <div className="row">
          {data.map((item, index) => {
            return (
              <div className="col-md-4 global-citizen" key={index}>
                <img className="img-fluid" src={item.image} alt="" />
                <h2>{item.heading}</h2>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Features;
