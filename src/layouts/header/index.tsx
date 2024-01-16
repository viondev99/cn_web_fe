import { FC } from "react";
import classes from "./header.module.scss";
import { ListMenuHeader } from "@/models/header";
import cx from "classnames";

const listMenu: ListMenuHeader[] = [
  {
    id: "menu1",
    name: "Menu 1",
  },
  {
    id: "menu2",
    name: "Menu 2",
  },
  {
    id: "menu3",
    name: "Menu 3",
  },
  {
    id: "menu4",
    name: "Menu 4",
  },
];

const Header: FC = () => {
  return (
    <div className="w-full bg-slate-300">
      <div className="Container">
        <div className={classes.Wrapper}>
          <div className={classes.textLogo}>Web Technology</div>
          <div className={classes.groupMenu}>
            {listMenu.map((it) => (
              <div
                key={it.id}
                className={cx(classes.menuItem, {
                  [classes.item4]: it.id === "menu4",
                })}
              >
                {it.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
