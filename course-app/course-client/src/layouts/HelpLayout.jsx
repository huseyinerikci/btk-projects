import { NavLink, Outlet } from "react-router";

const HelpLayout = () => {
  return (
    <div id="help-layout">
      <h1>Help</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, optio
        eum quis, iure delectus atque corrupti dolores nam maxime quo officia
        repudiandae accusamus necessitatibus deserunt vel dolorem, fugiat ipsam
        molestias?
      </p>
      <nav>
        <NavLink to="contact">Contact</NavLink>
        <NavLink to="faq">FAQ</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default HelpLayout;
