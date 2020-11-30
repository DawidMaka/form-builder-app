export enum Actions {
  Remove = 'remove',
  Update = 'update',
}

export enum OptionValues {
  Text = 'Text',
  YesNo = 'Yes/No',
  Number = 'Number',
  Equals = 'Equals',
  GreatherThan = 'Greather than',
  LessThan = 'Less than',
  Yes = 'Yes',
  No = 'No',
}

export enum ItemKeys {
  Id = 'id',
  Parent = 'parent'
}

export interface Item {
  id: number;
  parent: number;
  question: string;
  type: string;
  conditionType?: string;
  conditionValue?: string;
}

export interface Items extends Item {
  items?: Items[];
}

export interface controllerInterface {
  index: number;
  store: storeInterface;
  view: viewInterface;
  addItem( parent: string | undefined ): void;
  removeItem( parents: string[] ): void;
  updateItem( formElement: HTMLInputElement | HTMLSelectElement ): void;
}

export interface templateInterface {
  element: Element;
  basicForm( item: Items ): HTMLDivElement;
  extendedForm( item: Items, type: string ): HTMLDivElement;
  formList( items: Items[], type?: string, container?: HTMLDivElement ): void;
  conditionFields( item: Partial<Items>, type: string ): HTMLDivElement;
}

export interface viewInterface {
  formBuilder: Element;
  template: templateInterface;
  displayItems( items: Item[] ): void;
  updateItem( formElement: HTMLInputElement | HTMLSelectElement, parents: string[] ): void;
  removeItem( parent: string ): void;
  addItem( item: Item ): void;
  bindAddItem( callback: ( parent: string | undefined ) => void ): void;
  bindRemoveItem( callback: ( parents: string[] ) => void ): void;
  bindUpdateItem( callback: ( element: HTMLInputElement | HTMLSelectElement ) => void ): void;
}

export interface storeInterface {
  name: string;
  getData(): Item[];
  setData( items: Item[] ): void;
  add( item: Item ): void;
  remove( parents: string[] ): void;
  update( element: HTMLInputElement | HTMLSelectElement, parents: string[] ): void;
}
