import { JSXElementConstructor } from "react";
import { Home } from "../../pages/home/Home";

interface IRoute {
  component: JSXElementConstructor<any>;
  href: string;
}

export const routes: IRoute[] = [{ href: "/", component: Home }];
