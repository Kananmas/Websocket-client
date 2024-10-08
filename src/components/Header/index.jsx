import { Outlet } from "react-router-dom";
import { randomString } from "../../utils/random-string.utils";
import { HeaderLink, HeaderWrapper, Icon } from "./index.style";

const links = [
  { title: "Sign Up", path: "/signup" },
  { title: "Sign In", path: "/signin" },
];


const HomeLinkStyle = {
  fontFamily: "fantasy",
  fontSize: "25px",
}

export function Header() {
  const handleClickMenu = () => {
    const event = new Event("OpenMenu");
    dispatchEvent(event);
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderLink
          style={HomeLinkStyle}
          to="/"
        >
          Whisper
        </HeaderLink>
        {links.map((link) => (
          <HeaderLink key={randomString()} to={link.path}>
            {link.title}
          </HeaderLink>
        ))}
        <Icon onClick={handleClickMenu} />
      </HeaderWrapper>
      <Outlet />
    </>
  );
}
