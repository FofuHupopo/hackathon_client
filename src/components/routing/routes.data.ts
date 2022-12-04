import { JSXElementConstructor } from "react";
import { Home } from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";

interface IRoute {
  component: JSXElementConstructor<any>;
  href: string;
}

export const routes: IRoute[] = [
  { href: "/", component: Home },
  { href: "/login", component: Login },
  { href: "/registration", component: Registration },
];
