import { Component } from "./base-components.js";
import { projectState } from "./../state/project-state.js";
import { autobindthis } from "../decorators/autobind.js";
import { Validatable, validate } from "./../utils/validation.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    const validatableTitle: Validatable = {
      value: title,
      required: true,
      minLength: 5,
    };

    const validatableDescription: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    };

    const validatablePeople: Validatable = {
      value: people,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeople)
    ) {
      alert("Invalid input");
      return;
    } else {
      return [title, description, Number(people)];
    }
  }

  @autobindthis
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      console.log(title, description, people);
      this.clearInputs();
    }
  }
}
