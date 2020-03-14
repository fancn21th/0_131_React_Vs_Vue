const { render } = ReactDOM;
const { useState, useRef } = React;

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

// compose pattern
const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

const capitalize = function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

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
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(dinos);
  const inputEl = useRef(null);

  const onChange = e => {
    setNewItem(e.target.value);
  };

  const onEnter = e => {
    if (e.key.toLowerCase() !== "enter") {
      console.log("not enter key");
      return;
    }

    if (e.target.value) {
      setItems([
        ...items,
        {
          text: e.target.value
        }
      ]);
      setNewItem("");
    }
  };

  const onClick = e => {
    const input = inputEl.current;

    if (input.value) {
      setItems([
        ...items,
        {
          text: input.value
        }
      ]);
      setNewItem("");
    }
  };

  return (
    <div id="card">
      <header>{title}</header>
      <article dangerouslySetInnerHTML={{ __html: content }} />
      <div>
        <input
          id="itemForm"
          type="text"
          ref={inputEl}
          value={newItem}
          onKeyDown={onEnter}
          onChange={onChange}
        />
        <button onClick={onClick}>Add Dinosaur</button>
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
