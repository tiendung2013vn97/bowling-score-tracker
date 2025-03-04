import { LazyExoticComponent } from "react";
import { ComponentRenderer } from "../types/layout.type";

export interface IRouteSetting {
  path: string;
  component: ComponentRenderer | LazyExoticComponent<ComponentRenderer>;
  exact?: boolean;
}
