import { useState } from "react";

import "./App.css";

type FormTypes = "text" | "number" | "select";

interface FormConfig {
  type: FormTypes;
  name: string;
  options?: string[];
}

const config: FormConfig[] = [
  { type: "text", name: "name" },
  { type: "text", name: "email" },
  { type: "number", name: "phone" },
  { type: "select", options: ["one", "two"], name: "options" },
];

function App() {
  const [form, setForm] = useState<Record<string, string>>({});
  const onFormSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle errors
    console.log("submit");
  };
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="container">
      <section className="section-wrapper">
        <form className="form" onSubmit={onFormSubmit}>
          {config.map(({ type, name, options }) => {
            if (type !== "select") {
              return (
                <label key={name}>
                  {name}
                  <input
                    type={type}
                    value={form[name]}
                    name={name}
                    onChange={onChange}
                  />
                </label>
              );
            }
            return (
              <label key={name}>
                Select a option
                <select value={form[name]} name={name} onChange={onChange}>
                  {options?.map((option) => {
                    return <option key={option}>{option}</option>;
                  })}
                </select>
              </label>
            );
          })}
          <button type="submit">submit form</button>
        </form>
      </section>

      <div className="result">{JSON.stringify(form, null, 2)}</div>
    </div>
  );
}

export default App;
