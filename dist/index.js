"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid = validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid = validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
function autobindthis(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importedNode.firstElementChild;
        this.sectionElement.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const lisId = `${this.type}-projects-list`;
        this.sectionElement.querySelector("ul").id = lisId;
        this.sectionElement.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = "user-input";
        this.titleInputElement = this.formElement.querySelector("#title");
        this.descriptionInputElement = this.formElement.querySelector("#description");
        this.peopleInputElement = this.formElement.querySelector("#people");
        this.configure();
        this.attach();
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        const validatableTitle = {
            value: title,
            required: true,
            minLength: 5,
        };
        const validatableDescription = {
            value: description,
            required: true,
            minLength: 5,
        };
        const validatablePeople = {
            value: people,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(validatableTitle) ||
            !validate(validatableDescription) ||
            !validate(validatablePeople)) {
            alert("Invalid input");
            return;
        }
        else {
            return [title, description, Number(people)];
        }
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            this.clearInputs();
            console.log(title, description, people);
        }
    }
    configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}
__decorate([
    autobindthis
], ProjectInput.prototype, "submitHandler", null);
__decorate([
    autobindthis
], ProjectInput.prototype, "configure", null);
const projectInput = new ProjectInput();
const active = new ProjectList("active");
const finished = new ProjectList("finished");
//# sourceMappingURL=index.js.map