export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    inserTo: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(inserTo);
  }

  private attach(insertWhere: boolean) {
    this.hostElement.insertAdjacentElement(
      insertWhere ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
