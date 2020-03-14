const { render } = ReactDOM;
const { useState } = React;

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

const capitalize = function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

const undercase = function(value) {
  if (!value) return "";
  value = value.toString();
  return value.toLowerCase();
};

const url = function(value) {
  if (!value) return "";
  value = value.toString();
  return "https://en.wikipedia.org/wiki/" + value;
};

const undercaseUrl = compose(undercase, url);

const Card = ({ data: { title, content, dinos } }) => {
  const [items, setItems] = useState(dinos);

  const onAddDianosaur = e => {
    e.preventDefault();
    setItems([
      ...items,
      {
        text: e.target.value
      }
    ]);
  };

  return (
    <div id="card">
      <header>{title}</header>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <input id="itemForm" type="text" />
        <button onClick={onAddDianosaur}>Add Dinosaur</button>
      </div>
      <ul>
        {items.map(({ text, weight }, index) => (
          <li key={index}>
            <h4>{capitalize(text)}</h4>
            <span>
              The {undercase(text)} weighs {weight}.
            </span>
            <br />
            <a href="#">{undercaseUrl(text)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

render(<Card data={data} />, document.getElementById("react-container"));
