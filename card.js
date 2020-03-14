const { render } = ReactDOM;

const data = {
  title: "Dinosaurs",
  content:
    "<strong>Dinosaurs</strong> are a diverse group of animals of the clade <em>Dinosauria</em> that first appeared during the Triassic period.",
  dinos: [
    {
      text: "Velociraptor",
      weight: "15 kg"
    },
    {
      text: "triceratops",
      weight: "6,000 kg"
    },
    {
      text: "Stegosaurus",
      weight: "2,500 kg"
    }
  ]
};

const Card = ({ data: { title, content, dinos } }) => {
  const onAddDianosaur = () => {};

  return (
    <div id="card">
      <header>{title}</header>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <input id="itemForm" type="text" />
        <button onClick={onAddDianosaur}>Add Dinosaur</button>
      </div>
      <ul></ul>
    </div>
  );
};

render(<Card data={data} />, document.getElementById("react-container"));
